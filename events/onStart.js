'user strict';

const bot = require('../bot.js');
const json = require("../helpers/json");

bot.on("ready", () => {
    //Setta il suggerimento
    bot.user.setActivity(`!start`);
});