const generateName = require("sillyname");
const Chance = require("chance");
const chance = new Chance();

module.exports = {
    generateRandomName: function generateRandomName() {
        var name = generateName();
        name = name.split(" ")[0];
        return name;
    },
    generateID: function generateID() {
        return chance.guid();
    }
};
