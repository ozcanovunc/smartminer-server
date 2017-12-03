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
        DEREGISTER_USER: "deregisterUser",
        UPDATE_USER_POSITION: "updateUserPosition",
        UPDATE_USER_STATE: "updateUserState",
        UPDATE_USER_SCORE: "updateUserScore",
        START_GAME: "startGame",
        UPDATE_MINES: "updateMines"
    },
    USER: {
        POSITION: {
            TOP: 50,
            LEFT: 50,
            LIMITS: {
                MIN: {
                    TOP: 0,
                    LEFT: 0
                },
                MAX: {
                    TOP: 100,
                    LEFT: 100
                }
            }
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
    MINE: {
        OFFSET: 10,
        DEFAULT_SCORE: 10,
        CONCURRENT_MINE: 10
    },
    PORT: process.env.PORT,
    IP: process.env.IP
};
