/**
 * registration controller
 */

import { factories } from "@strapi/strapi";
import { errors } from "@strapi/utils";
import { Context } from "koa";
import Handlebars from "handlebars";
import fs from "fs";
import { File } from "formidable";

export default factories.createCoreController(
    "api::registration.registration",
    ({ strapi }) => ({
        async create(ctx) {
            const user = ctx.state.user;

            ctx.request.body.data = {
                ...ctx.request.body.data,
                registerStatus: "PAYMENT_PENDING",
            };

            strapi.log.debug(`ctx.state.user: ${JSON.stringify(user)}`);

            strapi.log.debug(JSON.stringify(ctx.request.body));

            const response = await super.create(ctx);

            return response;
        },
        async uploadReceipt(ctx: Context) {
            const { registration_document_id } = ctx.params;
            // Validate if exists registration
            const registration = await strapi
                .documents("api::registration.registration")
                .findOne({
                    documentId: registration_document_id,
                    populate: [
                        "course",
                        "receiptAddress",
                        "receiptAddress.province",
                        "receiptAddress.subdistrict",
                        "receiptAddress.district",
                    ],
                });

            if (!registration) {
                throw new errors.ApplicationError(
                    "no Registration with documentId: " +
                        registration_document_id
                );
            }

            const { files } = ctx.request.files;

            if (!files) {
                throw new errors.ValidationError(
                    "No files uploaded in formData"
                );
            }

            if (Array.isArray(files)) {
                throw new errors.ValidationError(
                    "files has more than one receipt!"
                );
            }

            // Upload document using upload plugin
            const uploadedFiles = await strapi
                .plugin("upload")
                .service("upload")
                .upload({
                    data: {}, // file metadata
                    files: files,
                });

            if (!uploadedFiles || uploadedFiles.length === 0) {
                throw new errors.ApplicationError("Upload failed");
            }
            const uploadedFile = uploadedFiles[0];

            const updatedRegistration = await strapi
                .documents("api::registration.registration")
                .update({
                    documentId: registration.documentId,
                    status: "published",
                    data: {
                        registerStatus: "ENROLLED",
                        receipt: uploadedFile.id,
                    },
                });

            const emailHtml = await strapi
                .documents("api::report-template.report-template")
                .findFirst({
                    filters: { name: { $eq: "email_invoice" } },
                });

            const htmlTemplateCompiled = Handlebars.compile(
                emailHtml.htmlTemplate
            );
            const subjectTemplateComiled = Handlebars.compile(
                emailHtml.description
            );

            const subject = subjectTemplateComiled({
                courseName: registration.course.name,
            });

            const isBangkok =
                registration.receiptAddress.province.nameTh === "กรุงเทพมหานคร";

            const subdistrict = `${isBangkok ? "แขวง" : "ต."}${registration.receiptAddress.subdistrict.nameTh}`;
            const district = `${isBangkok ? "เขต" : "อ."}${registration.receiptAddress.district.nameTh}`;
            const province = `${isBangkok ? "" : "จ."}${registration.receiptAddress.province.nameTh}`;

            const html = htmlTemplateCompiled({
                courseName: registration.course.name,
                participant: registration.nameOnCertificate,
                address: registration.receiptAddress,
                subdistrict: subdistrict,
                district: district,
                province: province,
                footerYear: new Date().getFullYear(),
            });

            const fileArray: [File] | [] = Array.isArray(files)
                ? (files as unknown as [File])
                : (files as unknown as File)
                  ? [files]
                  : [];

            strapi.log.debug("Received files: ", fileArray.length);
            strapi.log.debug("fileArray[0].filepath:" + fileArray[0].filepath);
            strapi.log.debug(
                "fileArray[0].originalFilename:" + fileArray[0].originalFilename
            );
            strapi.log.debug("fileArray[0]:mimetype" + fileArray[0].mimetype);

            const attachments = await Promise.all(
                fileArray.map(async (file: File) => {
                    return {
                        filename: file.originalFilename,
                        content: fs.createReadStream(file.filepath),
                        contentType: file.mimetype,
                    };
                })
            );

            const result = await strapi.service("api::gmail.gmail").send({
                to: registration.email,
                subject: subject,
                html: html,
                attachments: attachments,
            });

            return await strapi
                .documents("api::registration.registration")
                .findOne({
                    documentId: registration_document_id,
                    populate: [
                        "uploads",
                        "receipt",
                        "certificateAddress",
                        "certificateAddress.province",
                        "certificateAddress.subdistrict",
                        "certificateAddress.district",
                        "receiptAddress",
                        "receiptAddress.province",
                        "receiptAddress.subdistrict",
                        "receiptAddress.district",
                    ],
                });
        },
        async uploadsConnect(ctx) {
            const { registration_document_id } = ctx.params;

            const data = {
                ...ctx.request.body.data,
                registerStatus: "PAYMENT_RECEIVED",
            };

            strapi.log.debug(JSON.stringify(data));

            strapi.log.debug(
                `registration_document_id: ${registration_document_id}`
            );

            const response = await strapi
                .documents("api::registration.registration")
                .update({
                    documentId: registration_document_id,
                    data: data,
                    status: "published",
                });

            return response;
        },
        async createWaitlist(ctx) {
            const data = {
                ...ctx.request.body.data,
                registerStatus: "WAIT_LIST",
            };
            const response = await strapi
                .documents("api::registration.registration")
                .create({
                    data: data,
                    status: "published",
                });
            return response;
        },
    })
);
