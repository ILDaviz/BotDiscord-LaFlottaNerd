
const botUtili = require('../../helpers/Util');
const texts = require("../../helpers/Json");

exports.run = async (message, bot) => {
  if (!message.member.roles.some(r => ["Admin", "Moderatori", "Developer"].includes(r.name)))
    return message.reply("Mi dispiace, non hai i permessi per inviare questo comando");
  const m = await message.channel.send("Attendi..");
  botUtili.cleenDatabase(function (err) {
    if (err) {
      return m.edit("Processo non completato.");
    }
  });
  m.edit("Processo completato.");
};

exports.conf = {
  name: "Pulisci_database",
  fullcmd: "pulisci_database",
  alias: "cleendb",
  description: texts.getText("command_utility_pulisci_database_description"),
  timer: 0,
  tokenCost: 0,
  subClass: 'utility_staff',
  displayHelp: 1
};