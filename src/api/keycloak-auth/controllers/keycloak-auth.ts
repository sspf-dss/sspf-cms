import type { Core } from "@strapi/strapi";

export default ({ strapi }: { strapi: Core.Strapi }) => ({
    async exchange(ctx) {
        const grant = (await strapi
            .store({ type: "plugin", name: "users-permissions", key: "grant" })
            .get()) as Record<string, { enabled?: boolean }> | null;
        if (!grant?.keycloak?.enabled) {
            return ctx.badRequest("This provider is disabled");
        }

        const usersPermissions = strapi.plugin("users-permissions");
        let user;
        try {
            // Finds or registers the user (honours allow_register/unique_email)
            // from the profile Keycloak's userinfo endpoint returns.
            user = await usersPermissions
                .service("providers")
                .connect("keycloak", {
                    access_token: ctx.request.header.authorization.slice(7),
                });
        } catch (err) {
            return ctx.badRequest(err.message);
        }
        if (user.blocked) {
            return ctx.forbidden("Your account has been blocked by an administrator");
        }

        const userSchema = strapi.getModel("plugin::users-permissions.user");
        return ctx.send({
            jwt: usersPermissions.service("jwt").issue({ id: user.id }),
            user: await strapi.contentAPI.sanitize.output(user, userSchema, {
                auth: ctx.state.auth,
            }),
        });
    },
});
