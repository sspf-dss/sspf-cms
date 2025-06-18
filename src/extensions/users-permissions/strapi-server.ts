import * as _ from "lodash";

const customRoutes = [
    {
        method: "PUT",
        path: "/users/:id",
        handler: "user.update",
        config: {
            policies: ["global::match-document-id"],
        },
    },
];

export default (plugin) => {
    // Capture the original factory function for the `auth` controller
    const originalAuthFactory = plugin.controllers.auth;

    // Create a new factory function that extends the original
    plugin.controllers.auth = ({ strapi }) => {
        const originalAuth = originalAuthFactory({ strapi });

        // Add a custom function to the `auth` controller
        originalAuth.customFunction = async (ctx) => {
            // const someValue = ctx.request.body?.someValue;
            // try {
            //     // Perform your logic here
            //     const result = await someAsyncOperation(someValue);
            //     ctx.response.body = result;
            // } catch (error) {
            //     return ctx.badRequest("An error occurred", error.details);
            // }
        };

        return originalAuth;
    };

    // const routes = _.filter(
    //     plugin.routes["content-api"].routes,
    //     (r) => r.path !== "/users/:id" && r.method !== "PUT"
    // );
    // strapi.log.debug(`JSON.stringify routes: ${JSON.stringify(routes)}`);

    // Extend the plugin routes if needed - routes should be an array, not an object
    // plugin.routes["content-api"].routes = [...customRoutes, ...routes];

    strapi.log.debug(
        `JSON.stringify: ${JSON.stringify(plugin.routes["content-api"].routes)}`
    );

    return plugin;
};
