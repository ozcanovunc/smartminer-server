const generateName = require("sillyname");
const Chance = require("chance");
const chance = new Chance();

module.exports = {
    generateRandomName: function generateRandomName() {
        return generateName();
    },
    generateID: function generateID() {
        return chance.guid();
    }
};
