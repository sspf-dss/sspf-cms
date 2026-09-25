// Only the /me routes are exposed. There is deliberately no core router, so
// API tokens can't list or edit other users' preferences.
// auth: false stops Strapi from parsing the Keycloak token as a Strapi token;
// the keycloak-user policy verifies it instead.
export default {
    routes: [
        {
            method: "GET",
            path: "/user-preferences/me",
            handler: "api::user-preference.user-preference.findMe",
            config: {
                auth: false,
                policies: ["global::keycloak-user"],
            },
        },
        {
            method: "PUT",
            path: "/user-preferences/me",
            handler: "api::user-preference.user-preference.updateMe",
            config: {
                auth: false,
                policies: ["global::keycloak-user"],
            },
        },
    ],
};
