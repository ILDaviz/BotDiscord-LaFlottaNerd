"use strict";
const json = require("./helpers/json");
const bot_json = require("./bot.json");
const BetaBot = false;
const Discord = require('discord.js');
const bot = new Discord.Client();
module.exports = bot;

if (BetaBot) {
	bot.login(bot_json.token_bot_develop);
	bot.conf = {
		prefix: bot_json.develop.prefix,
		claimTimeout: bot_json.develop.claimTimeout,
		footer_standard: json.getText('footer_standard'),
		id_bot: bot_json.develop.id_bot,
		chanel_log: bot_json.develop.chanel_log,
		guild_lfn_id: bot_json.develop.guild_lfn_id,
		host: bot_json.develop.host,
		user: bot_json.develop.user,
		password: bot_json.develop.password,
		database: bot_json.develop.database
	};
} else {
	bot.login(bot_json.token_bot_online);
	bot.conf = {
		prefix: bot_json.online.prefix,
		claimTimeout: bot_json.online.claimTimeout,
		footer_standard: json.getText('footer_standard'),
		id_bot: bot_json.online.id_bot,
		chanel_log: bot_json.online.chanel_log,
		guild_lfn_id: bot_json.online.guild_lfn_id,
		host: bot_json.online.host,
		user: bot_json.online.user,
		password: bot_json.online.password,
		database: bot_json.online.database
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
require('./helpers/loadcommands').load();