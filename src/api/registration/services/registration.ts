/**
 * registration service
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreService(
    "api::registration.registration",
    ({ strapi }) => ({
        async registerCount(courseId: string, userId: string) {
            return strapi.documents("api::registration.registration").count({
                filters: {
                    $and: [
                        {
                            course: {
                                documentId: {
                                    $eq: courseId,
                                },
                            },
                        },
                        {
                            user: {
                                documentId: {
                                    $eq: userId,
                                },
                            },
                        },
                    ],
                },
            });
        },
    })
);
