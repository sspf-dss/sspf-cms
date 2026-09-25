/**
 * user-preference controller
 */

import { factories } from "@strapi/strapi";

const UID = "api::user-preference.user-preference";
const MAX_PREFS_LENGTH = 10_000;

export default factories.createCoreController(UID, ({ strapi }) => ({
    async findMe(ctx) {
        const doc = await strapi.documents(UID).findFirst({
            filters: { userId: ctx.state.keycloakSub },
        });
        ctx.body = { data: { prefs: doc?.prefs ?? {} } };
    },

    async updateMe(ctx) {
        const userId: string = ctx.state.keycloakSub;
        const prefs = ctx.request.body?.data?.prefs;

        if (!prefs || typeof prefs !== "object" || Array.isArray(prefs)) {
            return ctx.badRequest("prefs must be an object");
        }
        if (JSON.stringify(prefs).length > MAX_PREFS_LENGTH) {
            return ctx.badRequest("prefs too large");
        }

        const existing = await strapi
            .documents(UID)
            .findFirst({ filters: { userId } });
        const doc = existing
            ? await strapi.documents(UID).update({
                  documentId: existing.documentId,
                  data: { prefs },
              })
            : await strapi.documents(UID).create({ data: { userId, prefs } });

        ctx.body = { data: { prefs: doc.prefs } };
    },
}));
