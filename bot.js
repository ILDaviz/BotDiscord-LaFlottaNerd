"use strict";
const json = require("./helpers/json");
const BetaBot = true;

const Discord = require('discord.js');
const bot = new Discord.Client();
module.exports = bot;


if (BetaBot) {
	bot.login('NTc0MTY3MTEyNjQyMzMwNjM0.XegmYg.Swg7Fai7x78HQf8NnFEwy3F6Dmc');
	bot.conf = {
		prefix: '!',
		claimTimeout: '15',
		footer_standard: json.getText('footer_standard'),
		id_bot: '574167112642330634',
		chanel_log: '651915252396589066',
		guild_lfn_id: '539030917121966085',
		host: 'localhost',
		user: 'root',
		password: '',
		database: 'bot_discord'
	};
} else {
	bot.login('NTM1NzY4MDE5NzIxMjU2OTYx.XamGxg.2nqM3F3lap2_Advn6IS2R-hYzcQ');
	bot.conf = {
		prefix: '!',
		claimTimeout: '15',
		footer_standard: json.getText('footer_standard'),
		id_bot: '535768019721256961',
		chanel_log: '631754254092206110',
		guild_lfn_id: '532184361068527646',
		host: 'localhost',
		user: 'root',
		password: '',
		database: 'bot_discord'
	};
}

require('./events/onStart');
require('./events/onMessage');
require('./events/onError');
require('./events/onCounter');
require('./events/onRuleSelector');
require('./events/onTrigger');
require('./events/onMemberInOut');
require('./events/onSchedule');
require('./helpers/loadCommands').load();