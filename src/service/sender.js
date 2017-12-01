const logger = require("../logger/index");
const constants = require("../constants");

module.exports = {
    send: function send(message) {
        switch (message.type) {
            case constants.COMMANDS.REGISTER_USER:
                var user = message.user;
                var ws = message.ws;
                var type = message.type;
                var newMessage = JSON.stringify({
                    type: type,
                    user: user
                });
                ws.send(newMessage);
                return logger.log(constants.SERVICE.SENDER, newMessage);
            default:
                return logger.error(constants.SERVICE.SENDER, `Unexpected message type: ${message.type}`);
        }
    }
};
