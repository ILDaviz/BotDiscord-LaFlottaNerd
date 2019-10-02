const Discord  = require('discord.js');
const botModel = require('../helpers/Models');
const botUtili = require('../helpers/Util');
const botCache = require('../helpers/Cache');

exports.run = async (message, bot) => {
  const args = message.content.slice(bot.conf.prefix.length).trim().split(/ +/g);
const args_1 = args.slice(1).join(' ');
const args_2 = args.slice(1).join(' ');
    if (!message.member.roles.some(r => ["Admin", "Moderatori", "Developer", "Aiutante di Bordo"].includes(r.name)))
      return message.reply("Mi dispiace, ma non hai le autorizzazioni per usare questo comando.");
    botModel.selectDeadUsers(function (err, res) {
      if (res.length > 0) {
        for (let i = res.length - 1; i >= 0; i--) {
          const id_discord = res[i].id_discord;
          botModel.selectUserWhiteList(id_discord, function (err, res) {
            if (res.length === 0) {
              let guild = client.guilds.get("532184361068527646");
              message.channel.send('Espulso utente: <@' + id_discord + '>\n');
              guild.members.get(id_discord).kick();
            }
          });
        }
      }
    });
    message.channel.send('Processo completato');
};

exports.conf = {
    name: "Espulsione_manuale",
    fullcmd: "espulsione_manuale",
    alias: "raid",
    description: "Avvia il processo di ban manualmente",
    timer: 0,
    tokenCost: 0,
    subClass: 'help_moderazione',
    displayHelp: 1
};