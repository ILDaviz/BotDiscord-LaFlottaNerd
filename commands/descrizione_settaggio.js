const Discord  = require('discord.js');
const botModel = require('../helpers/Models');
const botUtili = require('../helpers/Util');
const botCache = require('../helpers/Cache');

exports.run = async (message, bot) => {
  
    const args = message.content.slice(bot.conf.prefix.length).trim().split(/ +/g);
    const args_2 = args.slice(2).join(' ');
    
    if (!message.member.roles.some(r => ["Admin", "Developer"].includes(r.name)))
      return message.reply("Mi dispiace, ma non hai le autorizzazioni per usare questo comando.");
    if (!args[1]) {
        return message.reply("Devi fornirmi un id_setting");
    }
    if (!args_2) {
      return message.reply("Devi fornirmi un valore");
    }
    botModel.updateSettingDescription(args[1], args_2, function (err, res) {
      if (err) {
        return message.channel.send('errore_text' + err);
      }
      message.channel.send('Descrizione Settaggio aggiunto');
    });
};

exports.conf = {
    name: "Descrizione_settaggio",
    fullcmd: "descrizione_settaggio",
    alias: "addsettdesc",
    description: "{id_setting} {valore} Aggiunge una descrizione informativa al valore",
    timer: 0,
    tokenCost: 0,
    subClass: 'impostazioni',
    displayHelp: 1
};