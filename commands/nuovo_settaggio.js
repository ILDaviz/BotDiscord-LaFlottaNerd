const Discord  = require('discord.js');
const botModel = require('../helpers/Models');
const botUtili = require('../helpers/Util');
const botCache = require('../helpers/Cache');

exports.run = async (message, bot) => {
  
    const args = message.content.slice(bot.conf.prefix.length).trim().split(/ +/g);
    const args_3 = args.slice(3).join(' ');

    if (!message.member.roles.some(r => ["Admin", "Developer"].includes(r.name)))
      return message.reply("Mi dispiace, ma non hai le autorizzazioni per usare questo comando.");
    if (!args[1]) {
        return message.reply("Devi fornirmi un tipo");
    }
    if (!args[2]) {
      return message.reply("Devi fornirmi un nome di riferimento!");
    }
    if (!args_3) {
      return message.reply("Devi fornirmi un valore!");
    }
    botModel.insertSetting(args[1], args[2], args_3, function (err, res) {
      if (err) {
        return message.channel.send('errore_text' + err);
      }
      message.channel.send('Settaggio aggiunto');
    });
};

exports.conf = {
    name: "Nuovo_settaggio",
    fullcmd: "nuovo_settaggio",
    alias: "newsett",
    description: "{tipo} {nome} {valore} Aggiungi un nuovo settaggio nel database. Tipo e nome non devono contenere spazzi. I tipi disponibili sono: settings,text,role,service_message,trigger. Non usare altri tipi. Il nome è il riferimento del settaggio devono essere univoci.",
    timer: 0,
    tokenCost: 0,
    subClass: 'impostazioni',
    displayHelp: 1
};