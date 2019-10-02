const Discord  = require('discord.js');
const botModel = require('../helpers/Models');
const botUtili = require('../helpers/Util');
const botCache = require('../helpers/Cache');

exports.run = async (message, bot) => {
  	const args = message.content.slice(bot.conf.prefix.length).trim().split(/ +/g);
  	const args_1 = args.slice(1).join(' ');
  	const args_2 = args.slice(1).join(' ');
    if (!message.member.roles.some(r => ["Admin", "Moderatori", "Developer"].includes(r.name)))
      return message.reply("Mi dispiace, ma non hai le autorizzazioni per usare questo comando.");
    const sayMessage = args_1;
    message.delete().catch(O_o => { });
    message.channel.send(sayMessage);
};

exports.conf = {
    name: "Parlo_io",
    fullcmd: "parlo_io",
    alias: "say",
    description: "[testo] Scrivere un testo personalizzato nelle spoglie del bot, il bot riscriverà il comando dove viene avviato.",
    timer: 0,
    tokenCost: 0,
    subClass: 'help_utility',
    displayHelp: 1
};