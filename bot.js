"use strict";

const Discord = require('discord.js');
const bot = new Discord.Client();
const botCache = require('./helpers/Cache');
module.exports = bot;

botCache.resetCache();
require('./events/onMessage');
require('./events/onError');
require('./events/onCounter');
require('./events/onMenzioni');
require('./events/onHelp');
require('./events/onStart')
require('./events/onRuleSelector');
//require('./events/onMemberInOut');
require('./helpers/loadcommands').load();

bot.login('NTc0MTY3MTEyNjQyMzMwNjM0.XZNqhA.z1DCVZfWBos-pOPfpYLPzOhA18A');
bot.conf = {
	prefix: '^',
	claimTimeout: '15',
	footer_standard: 'Il comando inizia con il simbolo ^ nelle parentesi quadre è rappresentato il comando più corto.',
	id_bot: '574167112642330634',
	chanel_log: '555661118639439872',
	guild_lfn_id: '532184361068527646'
};
