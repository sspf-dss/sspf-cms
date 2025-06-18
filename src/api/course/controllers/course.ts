/**
 * course controller
 */

import { factories } from "@strapi/strapi";
import _ from "lodash";

export default factories.createCoreController(
    "api::course.course",
    ({ strapi }) => ({
        async registeredCount(ctx, next) {
            await this.validateQuery(ctx);
            const { course_document_id } = ctx.params;

            const knex = strapi.db.connection;

            const sql = knex({
                R: "registrations",
            })
                .select(
                    "C.course_id as course_id",
                    knex.raw("group_concat(R.register_status) as status")
                )
                .whereRaw(
                    "Course.document_id = ? and R.published_at is not null",
                    [course_document_id]
                )
                .innerJoin(
                    "registrations_course_lnk as C",
                    "C.registration_id",
                    "R.id"
                )
                .innerJoin("courses as Course", "C.course_id", "Course.id")
                .groupBy("C.course_id");

            ctx.body = await sql.then((resp) => {
                if (resp.length > 0) {
                    return _.countBy(_.split(resp[0].status, ","));
                }
                return {};
            });
        },
    })
);
