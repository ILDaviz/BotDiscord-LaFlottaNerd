'user strict';

const bot = require('../bot.js');
const Discord = require('discord.js');
const cmds = require('../helpers/loadcommands').getCmds();
const botUtil = require('../helpers/util');

let extendMessage = require('../structs/Message');
let lastMessageUnix = new Date().getTime();

bot.on('message', (message) => {

	if (message.author.bot) return;

	//Scrive un messaggio di passaggio di livello
	botUtil.utenteSuperamentoLivello(message);

	if (message.content[0] !== bot.conf.prefix) {
		return;
	}

	lastMessageUnix = new Date().getTime();
	// Add some additional metadata to the message
	message = extendMessage(message);

	try {
		if(new Date().getTime() - cmds[message.cmd].timer < cmds[message.cmd].conf.timer){
			return;
		}
		cmds[message.cmd].timer = new Date().getTime();
		cmds[message.cmd].run(message, bot);
	} catch (err) {
		let emb = new Discord.RichEmbed()
			.setTitle(`Mh... sicuro di aver scritto giusto? :scream:`)
			.setColor("RANDOM")
			.setDescription("Questo comando mi emoziona ma non so a cosa serva.. Usa " + bot.conf.prefix + "start per vedere tutti i miei comandi :kissing_heart: ");
		message.channel.send(emb);
	}
});