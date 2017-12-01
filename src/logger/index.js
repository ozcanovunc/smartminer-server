module.exports = {
    error: function error(service, message) {
        console.log(`[ERROR] [${service}]`, message);
    },
    log: function log(service, message) {
        console.log(`[LOG] [${service}]`, message);
    }
};
