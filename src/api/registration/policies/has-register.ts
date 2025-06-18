import { errors } from "@strapi/utils";
const { PolicyError } = errors;

export default async (policyContext, config, { strapi }) => {
    const reqUserId = policyContext.request.body["data"]["user"][0];
    const courseId = policyContext.request.body["data"]["course"][0];
    const regCount = await strapi
        .service("api::registration.registration")
        .registerCount(courseId, reqUserId)
        .then((resp) => resp);

    strapi.log.debug(`regCount: ${regCount}`);

    if (regCount >= 1) {
        // Go to next policy or will reach the controller's action.
        throw new errors.PolicyError("You have already registered", {
            policy: "has-register",
        });
    }

    return true;
};
