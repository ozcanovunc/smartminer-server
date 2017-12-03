const logger = require("../logger/index");
const constants = require("../constants");

module.exports = {
    send: function send(ws, message) {
        switch (message.type) {
            case constants.COMMANDS.REGISTER_USER:
            case constants.COMMANDS.START_GAME:
            case constants.COMMANDS.UPDATE_USER_POSITION:
            case constants.COMMANDS.UPDATE_USER_SCORE:
            case constants.COMMANDS.UPDATE_MINES:
                var newMessage = JSON.stringify(message);
                ws.send(newMessage);
                return logger.log(constants.SERVICE.SENDER, newMessage);
            default:
                return logger.error(constants.SERVICE.SENDER, `Unexpected message type: ${message.type}`);
        }
    }
};
