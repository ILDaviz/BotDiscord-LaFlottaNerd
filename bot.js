"use strict";

const Discord = require('discord.js');
const bot = new Discord.Client();
module.exports = bot;

require('./events/onMessage');
require('./events/onError');
require('./events/onCounter');
require('./events/onMenzioni');
require('./events/onStart')
require('./events/onRuleSelector');
require('./events/onTrigger');
//require('./events/onMemberInOut');
//require('./events/onSchedule');
require('./helpers/loadcommands').load();

bot.login('NTc0MTY3MTEyNjQyMzMwNjM0.XZNqhA.z1DCVZfWBos-pOPfpYLPzOhA18A');
bot.conf = {
	prefix: '?',
	claimTimeout: '15',
	footer_standard: 'Il comando è valido solo se prima c\'è il simbolo ? . Nelle parentesi quadre è rappresentato il comando più corto. Le parentesi graffe servono solo a farti capire dove e cosa indicare per avviare il comando correttamente',
	id_bot: '574167112642330634',
	chanel_log: '555661118639439872',
	guild_lfn_id: '532184361068527646'
};
