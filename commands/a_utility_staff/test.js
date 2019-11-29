const Discord  = require('discord.js');
const botModel = require('../../helpers/Models');
const botUtili = require('../../helpers/Util');
const botCache = require('../../helpers/Cache');
const texts = require("../../helpers/Json");

exports.run = async (message, bot) => {
  if (!message.member.roles.some(r => ["Admin", "Developer"].includes(r.name)))
    return message.reply("Mi dispiace, ma non hai le autorizzazioni per usare questo comando.");
  botUtili.getServiceMessage();
};

exports.conf = {
    name: "Test",
    fullcmd: "test",
    alias: "test",
    description: "",
    timer: 0,
    tokenCost: 0,
    subClass: 'utility_staff',
    displayHelp: 0
};