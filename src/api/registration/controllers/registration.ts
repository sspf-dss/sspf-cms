/**
 * registration controller
 */

import { factories } from "@strapi/strapi";

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
