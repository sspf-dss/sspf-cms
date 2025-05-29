export default {
    beforeCreate(event) {
        const { data, where, select, populate } = event.params;
        data.displayName = data.title + data.firstName + " " + data.lastName;
    },
    beforeUpdate(event) {
        const { data, where, select, populate } = event.params;
        data.displayName = data.title + data.firstName + " " + data.lastName;
    },
};
