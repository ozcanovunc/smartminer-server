const util = require("../util");
const constants = require("../constants");
const logger = require("../logger/index");
const generateRandomName = util.generateRandomName;
const send = require("./sender").send;

var users = {};

module.exports = {
    register: function register(ws, id, name) {
        if (!ws) {
            return logger.error(constants.SERVICE.USER, `WebSocket must be provided`);
        }
        if (!id) {
            return logger.error(constants.SERVICE.USER, `Client must provide id when registering`);
        }
        name = name || generateRandomName();
        var user = {
            id: id,
            name: name,
            score: 0,
            position: {
                top: constants.USER.TOP_POSITION,
                left: constants.USER.LEFT_POSITION
            }
        };
        users[id] = user;

        send({
            type: constants.COMMANDS.REGISTER_USER,
            ws: ws,
            user: user
        });
    },
    deregister: function deregister(id) {
        delete users[id];
    },
    getAll: function getAll() {
        return users;
    },
    getByID: function getByID(id) {
        var user = users[id];
        if (!user) {
            logger.error(constants.SERVICE.USER, `User ${id} doesn't exist`);
        }
        else {
            return user;
        }
    },
    updatePosition: function updatePosition(id, top, left) {
        var user = this.getByID(id);
        if (!top) {
            logger.error(constants.SERVICE.USER, `Top positon is missing for user ${id}`);
        }
        else if (!left) {
            logger.error(constants.SERVICE.USER, `Left positon is missing for user ${id}`);
        }
        else {
            user.position.top = top;
            user.position.left = left;
        }
    }
};
