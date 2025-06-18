import { authPlugins } from "mysql2";
import { config } from "process";

export default {
    routes: [
        {
            // Path defined with a URL parameter
            method: "PUT",
            path: "/registrations/:registration_document_id/uploads-connect",
            handler: "api::registration.registration.uploadsConnect",
            config: {
                auth: false,
            },
        },
        {
            method: "POST",
            path: "/registrations/waitlist",
            handler: "api::registration.registration.createWaitlist",
            config: {
                auth: false,
            },
        },
    ],
};
