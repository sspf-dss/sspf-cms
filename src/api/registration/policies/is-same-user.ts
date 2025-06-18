import { errors } from "@strapi/utils";
const { PolicyError } = errors;

export default (policyContext, config, { strapi }) => {
    const reqUserId = policyContext.request.body["data"]["user"][0];

    strapi.log.debug(
        `reqUserId: ${reqUserId} and state.user.id: ${policyContext.state.user.documentId}`
    );

    if (policyContext.state.user.documentId === reqUserId) {
        // Go to next policy or will reach the controller's action.
        return true;
    }

    throw new errors.PolicyError(
        "You are not allowed: user from request is not matched with auth",
        {
            policy: "is-same-user",
        }
    );
};
