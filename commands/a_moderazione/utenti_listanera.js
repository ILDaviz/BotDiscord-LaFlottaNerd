const Discord = require('discord.js');
const botModel = require('../../helpers/models');
const texts = require("../../helpers/json");

exports.run = async (message, bot) => {

  const args = message.content.slice(bot.conf.prefix.length).trim().split(/ +/g);
  const args_1 = args[1];

  if (!message.member.roles.some(r => ["Admin", "Developer"].includes(r.name)))
    return message.reply("Mi dispiace, ma non hai le autorizzazioni per usare questo comando.");

  botModel.selectUsersInToGrave(function (err, res) {
    if (err) {
      return message.channel.send('errore_text' + err);
    }

    if (res.length === 0) {
      return message.reply("Nessun utente in lista nera.");
    }

    for (let index = 0; index < res.length; index++) {
      let id_discord = res[index].id_discord;
      let last_check = res[index].last_check;
      let notified = res[index].notified;

      let embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setDescription('Utente <@' + id_discord + '>')
        .addField("Ultima aggiornamento", last_check, true)
        .addField("Notificato?", notified == 1 ? 'Notificato' : 'Non Notificato' , true)
      message.channel.send({ embed });
    }
  });
};

exports.conf = {
  name: "Utenti_listanera",
  fullcmd: "utenti_listanera",
  alias: "grave",
  description: texts.getText("command_moderazione_utenti_lista_nera_description"),
  timer: 0,
  tokenCost: 0,
  subClass: 'help_moderazione',
  displayHelp: 1
};