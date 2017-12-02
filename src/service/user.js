const constants = require("../constants");
const logger = require("../logger/index");
const send = require("./sender").send;
const User = require("../User");
const GameService = require("./game");

var users = {};

module.exports = {
    register: function register(ws, name) {
        var user = new User(ws, name);
        var userID = user.id;
        users[userID] = user;

        send(ws, {
            type: constants.COMMANDS.REGISTER_USER,
            user: {
                id: user.id,
                name: user.name
            }
        });

        ws.on("error", (e) => {
            this.deregister(userID);
            return logger.error(constants.SERVICE.INDEX, `ws onError: ${e}`);
        });

        ws.on("close", (e) => {
            this.deregister(userID);
            return logger.log(constants.SERVICE.INDEX, `ws onClose: ${e}`);
        });
    },
    deregister: function deregister(id) {
        var user = users[id];
        user && GameService.endGame(user.getGameID());
        delete users[id];
    },
    getAll: function getAll() {
        return users;
    },
    getByID: function getByID(id) {
        var user = users[id];
        if (!user) {
            logger.error(constants.SERVICE.USER, `getByID failed, user ${id} doesn't exist`);
        }
        else {
            return user;
        }
    },
    updateState: function updateState(id, state) {
        var user = this.getByID(id);
        if (user) {
            user.updateState(state);
            if (user.getState() === constants.USER.STATE.SEARCHING_FOR_OPPONENT) {
                GameService.findOpponent(users);
            }
        }
    }
};
