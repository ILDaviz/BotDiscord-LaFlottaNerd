const Discord  = require('discord.js');
const botModel = require('../helpers/Models');
const botUtili = require('../helpers/Util');
const botCache = require('../helpers/Cache');

exports.run = async (message, bot) => {
  const args = message.content.slice(bot.conf.prefix.length).trim().split(/ +/g);
const args_1 = args.slice(1).join(' ');
const args_2 = args.slice(2).join(' ');
    if (!message.member.roles.some(r => ["Admin", "Moderatori", "Aiutante di Bordo", "Developer"].includes(r.name)))
      return message.reply("Mi dispiace, non hai i permessi per inviare questo comando");
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member)
      return message.reply("Per piacere menziona un utente presente nel server");
    if (!member.kickable)
      return message.reply("Purtroppo non posso espellerlo! Ha un ruolo più alto? Hai il permesso di espellere?");

    botModel.selectUserWhiteList(member.user.id , function (err, res) {
      if (res.length > 0) {
        return message.reply("Mi diapice, ma questo utente si trova in Whitelist!");
      }
    });
  
    let reason = args.slice(1).join(' ');
    if (!reason) reason = "Nessuna ragione";
    botModel.deleteUser(member.id, function(err,res){ });
    await member.kick(reason)
      .catch(error => message.reply(`Mi dispiace ${message.author} non ho potuto espellerlo perché : ${error}`));
    message.reply(`${member.user.tag} utente espulso da ${message.author.tag} perché: ${reason}`);
};

exports.conf = {
    name: "Espelli_utente",
    fullcmd: "espelli_utente",
    alias: "kick",
    description: "[id utente] [motivo espulsione (opzionale)] Espelli un determinato utente",
    timer: 0,
    tokenCost: 0,
    subClass: 'help_moderazione',
    displayHelp: 1
};