const Discord  = require('discord.js');
const botModel = require('../helpers/Models');
const botUtili = require('../helpers/Util');
const botCache = require('../helpers/Cache');

exports.run = async (message, bot) => {
  message.channel.send(":kissing_heart:");
};

exports.conf = {
    name: "Bacio",
    fullcmd: "bacio",
    alias: "kiss",
    description: "Ti do un bacino..",
    timer: 0,
    tokenCost: 0,
    subClass: 'help_utility',
    displayHelp: 1
};