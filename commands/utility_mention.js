const Discord  = require('discord.js');
const botModel = require('../helpers/Models');
const botUtili = require('../helpers/Util');
const botCache = require('../helpers/Cache');

exports.run = async (message, bot) => {

    if (!message.member.roles.some(r => ["Admin", "Developer"].includes(r.name)))
      return message.reply("Mi dispiace, ma non hai le autorizzazioni per usare questo comando.");
    botModel.updateResetBotMention(function (err, res) { });
    message.channel.send('Menzioni resettati');
};

exports.conf = {
    name: "Reset_menzioni_bot",
    fullcmd: "reset_menzioni_bot",
    alias: "rmbot",
    description: "Resetta il contatore delle menzioni",
    timer: 0,
    tokenCost: 0,
    subClass: 'help_utility',
    displayHelp: 1
};