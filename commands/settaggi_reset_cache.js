const Discord  = require('discord.js');
const botModel = require('../helpers/Models');
const botUtili = require('../helpers/Util');
const botCache = require('../helpers/Cache');

exports.run = async (message, bot) => {
  	const args = message.content.slice(bot.conf.prefix.length).trim().split(/ +/g);
	const args_1 = args.slice(1).join(' ');
  	const args_2 = args.slice(2).join(' ');
  	botCache.resetCache();
    message.channel.send('reset completato');
};

exports.conf = {
    name: "Reset_Cache",
    fullcmd: "reset_cache",
    alias: "rcache",
    description: "Resetta la cache del bot dopo qualsiasi modifica bisogna dare questo comando",
    timer: 0,
    tokenCost: 0,
    subClass: 'help_settaggi',
    displayHelp: 1
};