const botModel = require('../../helpers/Models');
const texts = require("../../helpers/Json");

exports.run = async (message, bot) => {
  
    const args = message.content.slice(bot.conf.prefix.length).trim().split(/ +/g);
    const args_2 = args.slice(2).join(' ');
    
    if (!message.member.roles.some(r => ["Admin", "Developer"].includes(r.name)))
      return message.reply(texts.getText('message_error_authorization'));
    if (!args[1]) {
        return message.reply(texts.getText('command_settins_error_id'));
    }
    if (!args_2) {
      return message.reply(texts.getText('message_error_value'));
    }
    botModel.updateSettingDescription(args[1], args_2, function (err, res) {
      if (err) {
        return message.channel.send('errore_text' + err);
      }
      message.channel.send('Descrizione Settaggio aggiornato');
    });
};

exports.conf = {
    name: "Descrizione_settaggio",
    fullcmd: "descrizione_settaggio",
    alias: "addsettdesc",
    description: texts.getText('command_descrizione_setting_descrtiption'),
    timer: 0,
    tokenCost: 0,
    subClass: 'impostazioni',
    displayHelp: 1
};