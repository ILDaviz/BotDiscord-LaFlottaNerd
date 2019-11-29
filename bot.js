"use strict";

const Discord = require('discord.js');
const bot = new Discord.Client();
const texts = require("./helpers/Json");

module.exports = bot;


require('./events/onMessage');
// require('./events/onError');
// require('./events/onCounter');
// require('./events/onMenzioni');
// require('./events/onStart')
// require('./events/onRuleSelector');
// require('./events/onTrigger');
// require('./events/onMemberInOut');
// require('./events/onSchedule');
require('./helpers/loadcommands').load();

const BetaBot = true;

if (BetaBot) {
	bot.login('NTc0MTY3MTEyNjQyMzMwNjM0.Xckuew.kJbyUoG8Bo-FWr1fcmhfjSzT8JY');
	bot.conf = {
		prefix: '!',
		claimTimeout: '15',
		footer_standard: texts.getText('footer_standard'),
		id_bot: '535768019721256961',
		chanel_log: '631754254092206110',
		guild_lfn_id: '532184361068527646'
	};
} else {
	bot.login('NTM1NzY4MDE5NzIxMjU2OTYx.XamGxg.2nqM3F3lap2_Advn6IS2R-hYzcQ');
	bot.conf = {
		prefix: '!',
		claimTimeout: '15',
		footer_standard: texts.getText('footer_standard'),
		id_bot: '535768019721256961',
		chanel_log: '631754254092206110',
		guild_lfn_id: '532184361068527646'
	};	
}