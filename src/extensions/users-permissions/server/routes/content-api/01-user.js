export default [
    {
        method: "PUT",
        path: "/users/:id",
        handler: "user.update",
        config: {
            policies: ["global::match-document-id"],
        },
    },
]
