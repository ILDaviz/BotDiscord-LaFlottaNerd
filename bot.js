"use strict";

const Discord = require('discord.js');
const bot = new Discord.Client();
module.exports = bot;

require('./events/onMessage');
require('./events/onError');
require('./helpers/loadcommands').load();
bot.login('574167112642330634');

bot.conf = {
	prefix: '^',
	claimTimeout: '15'
};
