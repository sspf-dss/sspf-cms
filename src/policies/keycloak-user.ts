import { createRemoteJWKSet, jwtVerify, JWTVerifyGetKey } from "jose";

// Verifies a Keycloak access token from the Authorization header and exposes
// its subject as ctx.state.keycloakSub. Use on routes with `auth: false`.
//   KEYCLOAK_ISSUER    must equal the token's `iss`, e.g. https://sso.example/realms/sspf
//   KEYCLOAK_CLIENT_ID optional; when set, only tokens issued to this client (azp) pass
let jwks: JWTVerifyGetKey | undefined;

export default async (
    ctx: any,
    config: Record<string, unknown>,
    { strapi }: { strapi: any }
): Promise<boolean> => {
    const issuer = process.env.KEYCLOAK_ISSUER;
    if (!issuer) {
        strapi.log.error("keycloak-user policy: KEYCLOAK_ISSUER is not set");
        return false;
    }

    const header: string = ctx.request.header.authorization ?? "";
    if (!header.startsWith("Bearer ")) {
        return false;
    }

    jwks ??= createRemoteJWKSet(
        new URL(`${issuer}/protocol/openid-connect/certs`)
    );

    try {
        const { payload } = await jwtVerify(header.slice(7), jwks, { issuer });
        const clientId = process.env.KEYCLOAK_CLIENT_ID;
        if (!payload.sub || (clientId && payload.azp !== clientId)) {
            return false;
        }
        ctx.state.keycloakSub = payload.sub;
        return true;
    } catch (err) {
        strapi.log.debug(`keycloak-user policy: ${err.message}`);
        return false;
    }
};
