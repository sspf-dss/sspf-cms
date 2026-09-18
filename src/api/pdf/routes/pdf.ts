export default {
  routes: [
    {
      method: "GET",
      path: "/pdf/:templateId/registration/:registrationId",
      handler: "pdf.generateRegistrationPDF",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
