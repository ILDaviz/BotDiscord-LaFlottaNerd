const Discord = require('discord.js');
const botModel = require('../../helpers/Models');
const botUtili = require('../../helpers/Util');
const botCache = require('../../helpers/Cache');
const texts = require("../../helpers/Texts");

exports.run = async (message, bot) => {
  const args = message.content.slice(bot.conf.prefix.length).trim().split(/ +/g);
  if (!message.member.roles.some(r => ["Admin", "Moderatori", "Aiutante di Bordo", "Developer"].includes(r.name)))
    return message.reply("Mi dispiace, non hai i permessi per inviare questo comando");
  let member = message.mentions.members.first() || message.guild.members.get(args[0]);
  if (!member)
    return message.reply("Menziona un utente presente nel server");
  botModel.deleteUserwhiteList(member.user.tag, function (err, res) {
    if (err) {
      return message.reply(`utente: ${member.user.tag} non è stato cancellato dalla Whitelist da ${message.author.tag} errore: ${err} `);
    }

    message.reply(`utente: ${member.user.tag} è stato cancellato dalla Whitelist da ${message.author.tag}.`);
    botUtili.log(`utente: ${member.user.tag} è stato cancellato dalla Whitelist da ${message.author.tag}.`);
  });
};

exports.conf = {
  name: "Elimina_utente_whitelist",
  fullcmd: "elimina_utente_whitelist",
  alias: "delwl",
  description: texts.getText("command_whitelist_wlimina_utente_description"),
  timer: 0,
  tokenCost: 0,
  subClass: 'help_moderazione',
  displayHelp: 1
};