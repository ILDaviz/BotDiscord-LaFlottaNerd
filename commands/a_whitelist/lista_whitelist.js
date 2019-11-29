const botModel = require('../../helpers/Models');
const texts = require("../../helpers/Json");

exports.run = async (message, bot) => {

  if (!message.member.roles.some(r => ["Admin", "Moderatori", "Aiutante di Bordo", "Developer"].includes(r.name)))
    return message.reply("Mi dispiace, non hai i permessi per inviare questo comando");
  message.channel.send("Processo in corso..(Attendere fino al completamento del comdando.)");
  botModel.selectUsersWhiteList(function (err, res) {
    if (err) {
      return message.channel.send('errore_text' + err);
    }
    if (res.length > 0) {
      for (let i = res.length - 1; i >= 0; i--) {
        let id_discord_wl = res[i].id_discord;
        let n_message_wl = res[i].tag;
        message.channel.send("Utente id: " + id_discord_wl + " // <@" + id_discord_wl + "> -- Nome tag: " + n_message_wl + " ;\n");
      }
      message.channel.send("Comando completato");
    } else {
      message.channel.send("Non ci utenti nella lista bianca");
    }
  });
};

exports.conf = {
  name: "Lista_whitelist",
  fullcmd: "lista_whitelist",
  alias: "listwl",
  description: texts.getText("command_whitelist_lista_description"),
  timer: 0,
  tokenCost: 0,
  subClass: 'help_moderazione',
  displayHelp: 1
};