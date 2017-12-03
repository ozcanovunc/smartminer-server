const util = require("../util");
const constants = require("../constants");
const generateID = util.generateID;
const send = require("./sender").send;
const logger = require("../logger/index");

var games = {};

module.exports = {
    findOpponent: function findOpponent(users) {
        var gameID = generateID();
        var game = {}; // Includes users in game by their id's

        for (var userID in users) {
            var user = users[userID];

            if (user.getState() === constants.USER.STATE.SEARCHING_FOR_OPPONENT)
                game[userID] = users[userID];

            // Create game room
            if (Object.keys(game).length === constants.GAME.PLAYERS_IN_ROOM) {
                for (var userID in game) {
                    user = game[userID];
                    user.setGameID(gameID);
                    user.updateState(constants.USER.STATE.IN_GAME);
                }
                games[gameID] = game;
                this.notifyAll(gameID, {
                    type: constants.COMMANDS.START_GAME,
                    gameID: gameID,
                    users: getAllUsersInRoom(game)
                });
            }
        }
    },
    endGame: function endGame(gameID) {
        delete games[gameID];
    },
    updatePosition: function updatePosition(gameID, userID, top, left) {
        var game = games[gameID];
        if (!game) {
            return logger.error(constants.SERVICE.GAME, `updatePosition failed, game ${gameID} doesn't exist`);
        }
        var user = game[userID];
        if (!user) {
            return logger.error(constants.SERVICE.GAME, `updatePosition failed, user ${userID} doesn't exist`);
        }
        if (top < 0 || left < 0) {
            return logger.error(constants.SERVICE.GAME, `updatePosition failed, top and left must be positive`);
        }

        user.updatePosition(top, left);

        this.notifyAll(gameID, {
            type: constants.COMMANDS.UPDATE_USER_POSITION,
            userID: userID,
            position: user.getPosition()
        });
    },
    notifyAll: function notifyAll(gameID, message) {
        var game = games[gameID];
        if (!game) {
            return logger.error(constants.SERVICE.GAME, `notifyAll failed, game ${gameID} doesn't exist`);
        }
        for (var userID in game) {
            var user = game[userID];
            var ws = user.ws;
            send(ws, message);
        }
    }
};

function getAllUsersInRoom(game) {
    var users = [];
    var userIDs = Object.keys(game);
    users.push({
        name: game[userIDs[0]].name,
        id: game[userIDs[0]].id,
        position: game[userIDs[0]].position,
        score: game[userIDs[0]].score,
    });
    users.push({
        name: game[userIDs[1]].name,
        id: game[userIDs[1]].id,
        position: game[userIDs[1]].position,
        score: game[userIDs[1]].score,
    });
    return users;
}
