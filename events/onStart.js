const bot = require('../bot.js');
const json = require("../helpers/Json");

bot.on("ready", () => {
    //Setta il suggerimento
    bot.user.setActivity(`!start`);
});