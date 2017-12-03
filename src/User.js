const util = require("./util");
const constants = require("./constants");
const logger = require("./logger/index");
const generateRandomName = util.generateRandomName;
const generateID = util.generateID;

function User(ws, name) {
    if (!ws) {
        return logger.error(constants.SERVICE.USER, `register failed, ws must be provided`);
    }
    this.ws = ws;
    this.id = generateID();
    this.name = name || generateRandomName();
    this.score = 0;
    this.state = constants.USER.STATE.IDLE;
    this.gameID = 0;
    this.position = {
        top: constants.USER.POSITION.TOP,
        left: constants.USER.POSITION.LEFT
    };
}

User.prototype.updatePosition = function updatePosition(top, left) {
    if (typeof top === "undefined") {
        logger.error(constants.SERVICE.USER, `updatePosition failed, top positon is missing for user ${this.id}`);
    }
    else if (typeof left === "undefined") {
        logger.error(constants.SERVICE.USER, `updatePosition failed, left positon is missing for user ${this.id}`);
    }
    else {
        this.position = {
            top: top,
            left: left
        };
    }
};

User.prototype.getPosition = function getPosition() {
    return this.position;
};

User.prototype.updateState = function updateState(state) {
    if (typeof state === "undefined") {
        logger.error(constants.SERVICE.USER, `updateState failed, state is missing for user ${this.id}`);
    }
    else {
        this.state = state;
    }
};

User.prototype.getState = function getState() {
    return this.state;
};

User.prototype.getScore = function getState() {
    return this.score;
};

User.prototype.updateScore = function updateScore(score) {
    if (typeof score === "undefined") {
        logger.error(constants.SERVICE.USER, `updateScore failed, score is missing for user ${this.id}`);
    }
    else {
        this.score = score;
    }
};

User.prototype.setGameID = function setGameID(gameID) {
    if (typeof gameID === "undefined") {
        logger.error(constants.SERVICE.USER, `setGameID failed, gameID is missing for user ${this.id}`);
    }
    else {
        this.gameID = gameID;
    }
};

User.prototype.getGameID = function getGameID() {
    return this.gameID;
};

User.prototype.getUserID = function getUserID() {
    return this.id;
};

module.exports = User;
