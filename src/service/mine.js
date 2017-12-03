const util = require("../util");
const generateRandomInteger = util.generateRandomInteger;
const constants = require("../constants");
const generateID = util.generateID;

var mines = {};
var notifyAll;

module.exports = {
    generateMine: function generateMine(gameID) {
        var top = generateRandomInteger({
            min: constants.USER.POSITION.LIMITS.MIN.TOP + constants.MINE.OFFSET,
            max: constants.USER.POSITION.LIMITS.MAX.TOP - constants.MINE.OFFSET
        });
        var left = generateRandomInteger({
            min: constants.USER.POSITION.LIMITS.MIN.LEFT + constants.MINE.OFFSET,
            max: constants.USER.POSITION.LIMITS.MAX.LEFT - constants.MINE.OFFSET
        });
        var score = constants.MINE.DEFAULT_SCORE;
        var mine = {
            position: {
                top: top,
                left: left
            },
            score: score,
            id: generateID()
        };
        mines[gameID] = mines[gameID] || {};
        mines[gameID][mine.id] = mine;
    },
    checkUserCaughtMine: function checkUserCaughtMine(user, top, left) {
        var gameID = user.getGameID();
        var userID = user.getUserID();
        var minesInGame = mines[gameID];
        var mineIDs = Object.keys(minesInGame);
        var score = 0;
        mineIDs.forEach(mineID => {
            var mine = minesInGame[mineID];
            var topMine = mine.position.top;
            var leftMine = mine.position.left;
            if (Math.abs(top - topMine) < constants.MINE.OFFSET && Math.abs(left - leftMine) < constants.MINE.OFFSET) {
                score += mine.score;
                delete minesInGame[mineID];
            }
        });
        if (score > 0) {
            var newScore = user.getScore() + score;
            user.updateScore(newScore);
            var message = {
                type: constants.COMMANDS.UPDATE_USER_SCORE,
                userID: userID,
                score: newScore
            };
            notifyAll(gameID, message);

            // Some mines are missing now, generate new ones
            this.generateMines(gameID);
        }
    },
    generateMines: function generateMines(gameID) {
        var minesInGame = mines[gameID] || {};
        var mineCount = Object.keys(minesInGame).length;
        for (var m = mineCount; m < constants.MINE.CONCURRENT_MINE; ++m) {
            this.generateMine(gameID);
        }
        var message = {
            type: constants.COMMANDS.UPDATE_MINES,
            mines: mines[gameID]
        };
        notifyAll(gameID, message);
    },
    setNotifyAll: function setNotifyAll(f) {
        notifyAll = f;
    }
};
