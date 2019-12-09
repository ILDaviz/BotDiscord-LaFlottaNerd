const botModel = require('../../helpers/models');
const texts = require("../../helpers/json");

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
  description: texts.getText('command_nuovo_settaggio_description'),
  timer: 0,
  tokenCost: 0,
  subClass: 'impostazioni',
  displayHelp: 1
};