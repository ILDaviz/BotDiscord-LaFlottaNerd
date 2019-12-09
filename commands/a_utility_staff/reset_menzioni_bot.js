
const botModel = require('../../helpers/models');
const texts = require("../../helpers/json");

exports.run = async (message, bot) => {

  if (!message.member.roles.some(r => ["Admin", "Developer"].includes(r.name)))
    return message.reply("Mi dispiace, ma non hai le autorizzazioni per usare questo comando.");
  botModel.updateResetBotMention(function (err, res) { });
  message.channel.send('Menzioni resettati');
};

exports.conf = {
  name: "Reset_menzioni_bot",
  fullcmd: "reset_menzioni_bot",
  alias: "rmbot",
  description: texts.getText("command_utility_reset_menzioni_bot_description"),
  timer: 0,
  tokenCost: 0,
  subClass: 'utility_staff',
  displayHelp: 1
};