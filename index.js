const WebSocket = require("ws");
const WebSocketServer = WebSocket.Server;
const UserService = require("./src/service/user");
const GameService = require("./src/service/game");
const logger = require("./src/logger/index");
const constants = require("./src/constants");
const wss = new WebSocketServer({
    port: constants.PORT,
    host: constants.IP
});

wss.on("connection", function connection(ws) {
    ws.on("message", function onMessage(e) {
        var message;
        try {
            message = JSON.parse(e);
        }
        catch (ex) {
            return logger.error(constants.SERVICE.INDEX, `Unexpected message: ${ex}`);
        }
        if (!message.type) {
            return logger.error(constants.SERVICE.INDEX, `Unexpected message with no type: ${e}`);
        }

        switch (message.type) {
            case constants.COMMANDS.REGISTER_USER:
                UserService.register(ws, message.name);
                return;
            case constants.COMMANDS.UPDATE_USER_POSITION:
                GameService.updatePosition(message.gameID, message.userID, message.top, message.left);
                return;
            case constants.COMMANDS.UPDATE_USER_STATE:
                UserService.updateState(message.userID, message.state);
                return;
            default:
                return logger.error(constants.SERVICE.INDEX, `Unexpected message type: ${message.type}`);
        }
    });
});
