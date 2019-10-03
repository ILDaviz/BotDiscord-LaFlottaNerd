const bot = require('../bot.js');
const cmds = require('../helpers/loadcommands').getCmds();
const botUtil = require('../helpers/Util');
let extendMessage = require('../structs/Message');
let lastMessageUnix = new Date().getTime();

bot.on('message', (message) => {
	
	if (message.author.bot) return;

	//Scrive un messaggio di passaggio di livello
	//botUtil.utenteSuperamentoLivello(message);
	//Risponde in automatico se presente una domanda
	//botUtil.rispostaAutomaticaAlleDomande(message);

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
		console.log(err);
	}
});