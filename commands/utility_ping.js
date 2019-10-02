const Discord  = require('discord.js');
const botModel = require('../helpers/Models');
const botUtili = require('../helpers/Util');
const botCache = require('../helpers/Cache');

exports.run = async (message, bot) => {
    const args = message.content.slice(bot.conf.prefix.length).trim().split(/ +/g);
const args_1 = args.slice(1).join(' ');
const args_2 = args.slice(2).join(' ');
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latenza server ${m.createdTimestamp - message.createdTimestamp}ms. Latenza API ${Math.round(client.ping)}ms`);
};

exports.conf = {
    name: "Ping",
    fullcmd: "ping",
    alias: "p",
    description: "Mostra il tempo di risposta del bot",
    timer: 0,
    tokenCost: 0,
    subClass: 'help_utility',
    displayHelp: 1
};