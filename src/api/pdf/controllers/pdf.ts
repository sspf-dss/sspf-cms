/**
 * A set of functions called "actions" for `pdf`
 */

import type { Core } from "@strapi/strapi";

export default ({ strapi }: { strapi: Core.Strapi }) => ({
  async generateRegistrationPDF(ctx) {
    try {
      const { templateId, registrationId } = ctx.params;

      // Validate IDs
      if (!templateId || !registrationId) {
        return ctx.badRequest("Missing templateId or registrationId");
      }

      // Fetch registration with course relations using Document Service API
      const registration = await strapi.documents(
        "api::registration.registration"
      ).findOne({
        documentId: registrationId,
        populate: ["course"],
      }) as any;

      if (!registration) {
        return ctx.notFound("Registration not found");
      }

      // Prepare data for template
      const course = registration.course;
      const data = {
        participantName: registration.nameOnCertificate,
        courseName: course?.name,
        courseDate:
          course?.startDate && course?.endDate
            ? `${course.startDate} - ${course.endDate}`
            : course?.startDate || "",
        registration,
        course,
      };

      // Generate PDF
      const pdfBuffer = await strapi
        .service("api::pdf.pdf")
        .generatePDF(templateId, data);

      // Return PDF
      ctx.set("Content-Type", "application/pdf");
      ctx.set(
        "Content-Disposition",
        `attachment; filename=certificate-${registrationId}.pdf`
      );
      ctx.body = pdfBuffer;
    } catch (err) {
      strapi.log.error("PDF Controller Error:", err);
      ctx.internalServerError("Failed to generate PDF");
    }
  },
});
