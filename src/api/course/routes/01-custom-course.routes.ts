export default {
    routes: [
        {
            // Path defined with a URL parameter
            method: "GET",
            path: "/courses/:course_document_id/registeredCount",
            handler: "api::course.course.registeredCount",
            config: {
                auth: false,
            },
        },
    ],
};
