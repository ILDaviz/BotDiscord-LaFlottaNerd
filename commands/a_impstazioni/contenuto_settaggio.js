const botModel = require('../../helpers/models');
const texts = require("../../helpers/json");

exports.run = async (message, bot) => {

  const args = message.content.slice(bot.conf.prefix.length).trim().split(/ +/g);
  const args_1 = args.slice(1).join(' ');

  if (!message.member.roles.some(r => ["Admin", "Developer"].includes(r.name)))
    return message.reply(texts.getText('message_error_authorization'));

  if (!args_1) {
    return message.reply(texts.getText('command_settins_error_id'));
  }

  botModel.selectSettingFromId(args_1, function (err, res) {
    if (err) {
      return message.channel.send('errore_text' + err);
    }
    if (res.length === 0) {
      return message.reply(texts.getText('command_error_no_settings'));
    }

    let value = res[0].value;
    let frase = unescape(value);
    message.channel.send(frase);
  });
};

exports.conf = {
  name: "Contenuto_settaggio",
  fullcmd: "contenuto_settaggio",
  alias: "consett",
  description: texts.getText('command_settings_contenuto_visualizza'),
  timer: 0,
  tokenCost: 0,
  subClass: 'impostazioni',
  displayHelp: 1
};