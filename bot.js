"use strict";

const Discord = require('discord.js');
const bot = new Discord.Client();
module.exports = bot;

require('./events/onMessage');
require('./events/onError');
require('./helpers/loadcommands').load();
bot.login('NTc0MTY3MTEyNjQyMzMwNjM0.XZNqhA.z1DCVZfWBos-pOPfpYLPzOhA18A');

bot.conf = {
	prefix: '^',
	claimTimeout: '15'
};
