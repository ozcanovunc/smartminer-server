const WebSocket = require("ws");
const WebSocketServer = WebSocket.Server;
const UserService = require("./src/service/user");
const logger = require("./src/logger/index");
const constants = require("./src/constants");
const util = require("./src/util");
const generateID = util.generateID;
const wss = new WebSocketServer({
    port: constants.PORT,
    host: constants.IP
});

var wsMap = {};

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
                var id = generateID();
                wsMap[ws] = id;
                UserService.register(ws, id, message.name);
                return;
            default:
                return logger.error(constants.SERVICE.INDEX, `Unexpected message type: ${message.type}`);
        }
    });

    ws.on("error", function onError(e) {
        UserService.deregister(wsMap[ws]);
        return logger.error(constants.SERVICE.INDEX, `ws onError: ${e}`);
    });

    ws.on("close", function onClose(e) {
        UserService.deregister(wsMap[ws]);
        return logger.log(constants.SERVICE.INDEX, `ws onClose: ${e}`);
    });
});
