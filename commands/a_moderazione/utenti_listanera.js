const Discord = require('discord.js');
const botModel = require('../../helpers/Models');
const texts = require("../../helpers/Json");

exports.run = async (message, bot) => {

  const args = message.content.slice(bot.conf.prefix.length).trim().split(/ +/g);
  const args_1 = args[1];

  if (!message.member.roles.some(r => ["Admin", "Developer"].includes(r.name)))
    return message.reply("Mi dispiace, ma non hai le autorizzazioni per usare questo comando.");

  if (!args_1) {
    return message.reply("Non hai indicato una pagina, se vuoi partire dalla prima pagina scrivi " + bot.conf.prefix + "grave 1.");
  }

  botModel.selectUsersInToGrave(function (err, res) {
    if (err) {
      return message.channel.send('errore_text' + err);
    }

    if (res.length === 0) {
      return message.reply("Nessun utente in lista nera.");
    }

    const lim = 10;
    let text = '';
    let tpage = 0;
    let nrt = res.length;
    tpage = nrt / lim;
    let npr = Math.floor(tpage) + 1;
    if (args_1 == 0) {
      var limit_start = 0;
      var limit_end = 10;
    } else {
      var limit_start = 10 * args_1;
      var limit_end = (10 * args_1) + 10;
    }

    if (args_1 > npr) {
      return message.reply("Il numero delle pagine è maggiore di quelle disponibili.");
    }

    for (let index = 0; index < res.length; index++) {
      const id_discord = res[index].id_discord;
      const last_check = res[index].last_check;
      const notified = res[index].notified;
      if (args_1 == 0) {
        if (index <= limit_end) {
          text += "Rif:  [<@" + id_discord + ">]  name: **" + last_check + "**\n";
        }
      } else {
        if (index >= limit_start && index <= limit_end) {
          text += "Rif:  [<@" + id_discord + ">]  name: **" + last_check + "**\n";
        }
      }
    }

    let embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle('Lista utenti in procinto di essere espulsi:')
      .addField("Pagina visualizzata:", "Pagina visualizzata: **" + args_1 + "**\n " + "Pagine totali: **" + npr + "**\n Elementi totali: **" + nrt + "**")
      .addField("settings disponibili:", text)
    message.channel.send({ embed });
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