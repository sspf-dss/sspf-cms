/**
 * registration router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::registration.registration", {
    config: {
        create: {
            policies: ["is-same-user", "has-register"],
            middlewares: [],
        },
    },
});
