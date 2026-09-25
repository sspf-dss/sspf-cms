// Exchanges a Keycloak access token (Authorization: Bearer) for a Strapi JWT.
// Replaces GET /auth/keycloak/callback?access_token=..., which Strapi >= 5.55
// only accepts after its own /connect/keycloak redirect flow.
// auth: false stops Strapi from parsing the Keycloak token as a Strapi token;
// the keycloak-user policy verifies it instead.
export default {
    routes: [
        {
            method: "POST",
            path: "/auth/keycloak/exchange",
            handler: "api::keycloak-auth.keycloak-auth.exchange",
            config: {
                auth: false,
                policies: ["global::keycloak-user"],
            },
        },
    ],
};
