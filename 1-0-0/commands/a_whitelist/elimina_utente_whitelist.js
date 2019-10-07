const Discord  = require('discord.js');
const botModel = require('../../helpers/Models');
const botUtili = require('../../helpers/Util');
const botCache = require('../../helpers/Cache');

exports.run = async (message, bot) => {
  const args = message.content.slice(bot.conf.prefix.length).trim().split(/ +/g);

    if (!message.member.roles.some(r => ["Admin", "Moderatori", "Aiutante di Bordo", "Developer"].includes(r.name)))
      return message.reply("Mi dispiace, non hai i permessi per inviare questo comando");
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member)
      return message.reply("Menziona un utente presente nel server");
    botModel.deleteUserwhiteList(member.user.tag, function(err,res){ });
    message.reply(`utente: ${member.user.tag} è stato cancellato dalla Whitelist da ${message.author.tag}.`);
};

exports.conf = {
    name: "Elimina_utente_whitelist",
    fullcmd: "elimina_utente_whitelist",
    alias: "delwl",
    description: "{id utente} Elimina un determinato utente dalla whitelist",
    timer: 0,
    tokenCost: 0,
    subClass: 'help_moderazione',
    displayHelp: 1
};