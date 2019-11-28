const Discord  = require('discord.js');
const botModel = require('../../helpers/Models');
const botUtili = require('../../helpers/Util');
const botCache = require('../../helpers/Cache');
const texts = require("../../helpers/Texts");

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
      botCache.resetCache(function(err){
        if (err) {
        message.channel.send('errore di reset cache' + err );
        }
        message.channel.send('Cache resettata con successo');
      });
    });
};

exports.conf = {
    name: "Nuovo_settaggio",
    fullcmd: "nuovo_settaggio",
    alias: "newsett",
    description: texts.getText('command_nuovo_settaggio_description'),
    timer: 0,
    tokenCost: 0,
    subClass: 'impostazioni',
    displayHelp: 1
};