const botModel = require('../../helpers/Models');
const texts = require("../../helpers/Json");

exports.run = async (message, bot) => {

  const args = message.content.slice(bot.conf.prefix.length).trim().split(/ +/g);
  const string = args.slice(2).join(' ');
  
  if (!message.member.roles.some(r => ["Admin", "Developer"].includes(r.name)))
    return message.reply(texts.getText('message_error_authorization'));

  if (!args[1]) {
    return message.reply(texts.getText('command_settins_error_id'));
  }

  if (!string) {
    return message.reply(texts.getText('message_error_value'));
  }

  botModel.updateSetting(args[1], string, function (err, res) {
    if (err) {
      return message.channel.send('errore_text' + err);
    }
    message.channel.send('Settaggio aggiornato');
  });
};

exports.conf = {
  name: "Aggiorna_settaggio",
  fullcmd: "aggiorna_settaggio",
  alias: "updsett",
  description: texts.getText('command_aggiornamento_settaggio_descrizione'),
  timer: 0,
  tokenCost: 0,
  subClass: 'impostazioni',
  displayHelp: 1
};