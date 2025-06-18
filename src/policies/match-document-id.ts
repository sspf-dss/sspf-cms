export default async (
    ctx: any,
    config: Record<string, unknown>,
    { strapi }: { strapi: any }
): Promise<boolean> => {
    const { id } = ctx.params;
    const { documentId } = ctx.request.body;
    const user = ctx.state.user;

    if (!user) {
        return ctx.unauthorized("You must be logged in");
    }

    if (parseInt(id, 10) !== user.id) {
        return ctx.forbidden("You can only update your own profile");
    }

    strapi.log.debug("xxxx");

    const currentUser = await strapi.entityService.findOne(
        "plugin::users-permissions.user",
        user.id,
        { fields: ["documentId"] }
    );

    if (!currentUser || currentUser.documentId !== documentId) {
        return ctx.forbidden("documentId does not match your account");
    }

    return true;
};
