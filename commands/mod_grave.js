const Discord  = require('discord.js');
const botModel = require('../helpers/Models');
const botUtili = require('../helpers/Util');
const botCache = require('../helpers/Cache');

exports.run = async (message, bot) => {
  const args = message.content.slice(bot.conf.prefix.length).trim().split(/ +/g);
const args_1 = args.slice(1).join(' ');
const args_2 = args.slice(2).join(' ');
    if (!message.member.roles.some(r => ["Admin", "Moderatori", "Developer"].includes(r.name)))
      return message.reply("Mi dispiace, non hai i permessi per inviare questo comando");
    message.channel.send("Lista utenti in procinto di essere espulsi: (Attendere fino al completamento del comdando.)");
    botModel.selectUsersInToGrave(function (err, res) {
        for (let i = 0; i < res.length; i++) {
          const id_discord = res[i].id_discord;
          const last_check = res[i].last_check;
          const notified = res[i].notified;
          botModel.selectUserWhiteList(id_discord, function (err, res) {
            if (res.length === 0) {
              if (notified === 1) {
                message.channel.send("<@" + id_discord + "> - " + last_check + " **notificato**;");
              }
            }
          });
        }
        message.channel.send("Comando completato");
      });
};

exports.conf = {
    name: "Utenti_listanera",
    fullcmd: "utenti_listanera",
    alias: "grave",
    description: "Utenti nella lista nera",
    timer: 0,
    tokenCost: 0,
    subClass: 'help_moderazione',
    displayHelp: 1
};