module.exports = {
    SERVICE: {
        "USER": "USER",
        "MESSAGE": "MESSAGE",
        "MINE": "MINE",
        "INDEX": "INDEX",
        "SENDER": "SENDER",
        "GAME": "GAME"
    },
    COMMANDS: {
        REGISTER_USER: "registerUser",
        UPDATE_USER_POSITION: "updateUserPosition",
        UPDATE_USER_STATE: "updateUserState",
        START_GAME: "startGame"
    },
    USER: {
        POSITION: {
            TOP: 50,
            LEFT: 50
        },
        STATE: {
            "IDLE": "IDLE",
            "SEARCHING_FOR_OPPONENT": "SEARCHING_FOR_OPPONENT",
            "IN_GAME": "IN_GAME"
        }
    },
    GAME: {
        PLAYERS_IN_ROOM: 2
    },
    PORT: process.env.PORT,
    IP: process.env.IP
};
