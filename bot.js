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
require('./events/onMemberInOut');
require('./events/onSchedule');
require('./helpers/loadcommands').load();

bot.login('NTM1NzY4MDE5NzIxMjU2OTYx.D1tQiQ.iJp9QDOa22XgrzAWmauTPgzytbA');
bot.conf = {
	prefix: '!',
	claimTimeout: '15',
	footer_standard: 'Il comando è valido solo se prima c\'è il simbolo ! . Le parentesi graffe servono solo a farti capire dove e cosa indicare per avviarlo correttamente.',
	id_bot: '535768019721256961',
	chanel_log: '555661118639439872',
	guild_lfn_id: '532184361068527646'
};
