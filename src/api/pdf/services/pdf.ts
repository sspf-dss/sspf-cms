/**
 * pdf service
 */

import type { Core } from "@strapi/strapi";
import Handlebars from "handlebars";
import puppeteer, { Browser, Page, PDFOptions } from "puppeteer";

export interface PdfOptions {
    format?: "A4" | "A5";
    orientation?: "Landscape" | "Portrait";
    printBackground?: boolean;
    margin?: {
        top?: string;
        right?: string;
        bottom?: string;
        left?: string;
    };
    displayHeaderFooter?: boolean;
    headerTemplate?: string;
    footerTemplate?: string;
}

export default ({ strapi }: { strapi: Core.Strapi }) => ({
    getDefaultCSS() {
        return `
            body {
                font-family: 'Helvetica', 'Arial', sans-serif;
                font-size: 14px;
                line-height: 1.4;
                color: #000;
            }
        `;
    },

    async generatePDF(
        templateId: string,
        data: Record<string, any>,
        options: PdfOptions = {}
    ): Promise<Buffer> {
        let browser: Browser | null = null;

        try {
            // Get template configuration using Document Service API
            const template = await strapi.documents(
                "api::report-template.report-template"
            ).findOne({
                documentId: templateId,
                populate: [],
            }) as any;

            if (!template) {
                throw new Error(`PDF template with ID ${templateId} not found`);
            }

            // Compile Handlebars template
            const compiledTemplate = Handlebars.compile(template.htmlTemplate);
            const html = compiledTemplate(data);

            // Determine orientation
            const isLandscape = 
                options.orientation === "Landscape" || 
                (!options.orientation && template.orientation === "Landscape");

            // Configure PDF options
            const pdfOptions: PDFOptions = {
                format: (template.paperSize || "A4") as PDFOptions["format"],
                landscape: isLandscape,
                printBackground: true,
                margin: template.margins
                    ? {
                          top: template.margins.top || "20mm",
                          right: template.margins.right || "20mm",
                          bottom: template.margins.bottom || "20mm",
                          left: template.margins.left || "20mm",
                      }
                    : {
                          top: "20mm",
                          right: "20mm",
                          bottom: "20mm",
                          left: "20mm",
                      },
                ...(options as any),
            };

            // Generate PDF
            browser = await puppeteer.launch({
                headless: true,
                args: ["--no-sandbox", "--disable-setuid-sandbox"],
            });

            const page: Page = await browser.newPage();

            // Set content with CSS styles
            const fullHtml = `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <style>
                ${template.cssStyles || this.getDefaultCSS()}
              </style>
            </head>
            <body>
              ${html}
            </body>
            </html>
          `;

            await page.setContent(fullHtml, { waitUntil: "load" });
            await page.waitForNetworkIdle();
            const pdfUint8Array = await page.pdf(pdfOptions);
            return Buffer.from(pdfUint8Array);

        } catch (error) {
            strapi.log.error("PDF generation failed:", error);
            throw error;
        } finally {
            if (browser) {
                await browser.close();
            }
        }
    },
});
