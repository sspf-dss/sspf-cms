/**
 * A set of functions called "actions" for `gmail`
 */
import type { SendMailInput } from "../type";
import type { Context } from "koa";

export default {
    send: async (ctx: Context, next) => {
        try {
            const body = ctx.request.body as SendMailInput;
            strapi.log.debug(
                "Hello from send controller with body: " + JSON.stringify(body)
            );

            if (!body.to) {
                ctx.status = 400;
                ctx.body = { error: '"to" field is required' };
                return;
            }

            const result = await strapi.service("api::gmail.gmail").send(body);

            ctx.status = 200;
            ctx.body = { message: "Email sent successfully", result };
        } catch (err: any) {
            strapi.log.error("Error sending email:", err);
            ctx.status = 500;
            ctx.body = { error: "Failed to send email" };
        }
    },
};
