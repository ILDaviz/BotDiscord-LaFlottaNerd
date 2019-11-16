
const botModel = require('../../helpers/Models');
const botCache = require('../../helpers/Cache');
const texts = require("../../helpers/Texts");

exports.run = async (message, bot) => {
    
    const args = message.content.slice(bot.conf.prefix.length).trim().split(/ +/g);
    const string = args.slice(2).join(' ');
    
    if (!message.member.roles.some(r => ["Admin", "Developer"].includes(r.name)))
      return message.reply("Mi dispiace, ma non hai le autorizzazioni per usare questo comando.");
    if (!args[1]) {
        return message.reply("Devi fornirmi un id_setting!");
    }
    if (!string) {
      return message.reply("Devi fornirmi un valore!");
    }
    botModel.updateSetting(args[1],string, function (err, res) {
      if (err) {
        return message.channel.send('errore_text' + err);
      }
      message.channel.send('Settaggio aggiornato');
      botCache.resetCache(function(err){
        if (err) {
        message.channel.send('errore di reset cache' + err );
        }
        message.channel.send('Cache resettata con successo');
      });
    });
};

exports.conf = {
    name: "Aggiorna_settaggio",
    fullcmd: "aggiorna_settaggio",
    alias: "updsett",
    description: "{id_settaggio} {Nuovo valore} Aggiorna un settaggio pre-esistente",
    timer: 0,
    tokenCost: 0,
    subClass: 'impostazioni',
    displayHelp: 1
};