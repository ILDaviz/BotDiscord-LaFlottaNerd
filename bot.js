"use strict";

const Discord = require('discord.js');
const bot = new Discord.Client();
module.exports = bot;

require('./events/onMessage');
require('./events/onError');
require('./events/onCounter');
require('./events/onMenzioni');
require('./events/onHelp');
require('./events/onStart')
require('./helpers/loadcommands').load();

bot.login('NTc0MTY3MTEyNjQyMzMwNjM0.XZNqhA.z1DCVZfWBos-pOPfpYLPzOhA18A');
bot.conf = {
	prefix: '^',
	claimTimeout: '15',
	footer_standard: 'Il comando inizia con il simbolo ^ nelle parentesi quadre è rappresentato il comando più corto.',
	id_bot: '574167112642330634'
};
