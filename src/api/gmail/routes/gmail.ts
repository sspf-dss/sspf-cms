export default {
    routes: [
        {
            method: "POST",
            path: "/gmail/send",
            handler: "api::gmail.gmail.send",
            config: {
                policies: [],
                middlewares: [],
                auth: false,
            },
        },
    ],
};
