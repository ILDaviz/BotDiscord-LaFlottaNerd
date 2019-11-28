const Discord  = require('discord.js');
const botModel = require('../../helpers/Models');
const botUtili = require('../../helpers/Util');
const botCache = require('../../helpers/Cache');
const texts = require("../../helpers/Texts");

exports.run = async (message, bot) => {
    const args = message.content.slice(bot.conf.prefix.length).trim().split(/ +/g);
    if (!message.member.roles.some(r => ["Admin", "Moderatori", "Aiutante di Bordo", "Developer"].includes(r.name)))
      return message.reply("Mi dispiace, non hai i permessi per inviare questo comando");
    let member = message.mentions.members.first();
    if (!member)
      return message.reply("Per piacere menziona un utente presente nel server");
    if (!member.bannable)
      return message.reply("Purtroppo non posso bannarlo! Hai il permesso di bannare gli utenti?");
    let reason = args.slice(1).join(' ');
    if (!reason) reason = "Nessuna ragione";
    await member.ban(reason)
      .catch(error => message.reply(`Mi dispiace ${message.author} non è stato possibile bannarlo perché: ${error}`));
    message.reply(`${member.user.tag} è stato bannato da ${message.author.tag} perché: ${reason}`);
};

exports.conf = {
    name: "Bannare_utente",
    fullcmd: "bannare_utente",
    alias: "ban",
    description: texts.getText("command_moderazione_bannare_utente_description"),
    timer: 0,
    tokenCost: 0,
    subClass: 'help_moderazione',
    displayHelp: 1
};