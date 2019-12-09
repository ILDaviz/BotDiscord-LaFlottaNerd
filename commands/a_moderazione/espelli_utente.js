
const botModel = require('../../helpers/models');
const texts = require("../../helpers/json");

exports.run = async (message, bot) => {
    const args = message.content.slice(bot.conf.prefix.length).trim().split(/ +/g);
    if (!message.member.roles.some(r => ["Admin", "Moderatori", "Aiutante di Bordo", "Developer"].includes(r.name)))
      return message.reply("Mi dispiace, non hai i permessi per inviare questo comando");
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member)
      return message.reply("Per piacere menziona un utente presente nel server");
    if (!member.kickable)
      return message.reply("Purtroppo non posso espellerlo! Ha un ruolo più alto? Hai il permesso di espellere?");

    botModel.selectUserWhiteList(member.user.id , function (err, res) {
      if (err) {
        return message.channel.send('errore_text' + err);
      }
      if (res.length > 0) {
        return message.reply("Mi diapice, ma questo utente si trova in Whitelist!");
      }
    });
  
    let reason = args.slice(1).join(' ');
    if (!reason) reason = "Nessuna ragione";
    botModel.deleteUser(member.id, function(err,res){
      if (err) {
        return message.channel.send('errore_text' + err);
      }
    });
    await member.kick(reason)
      .catch(error => message.reply(`Mi dispiace ${message.author} non ho potuto espellerlo perché : ${error}`));
    message.reply(`${member.user.tag} utente espulso da ${message.author.tag} perché: ${reason}`);
};

exports.conf = {
    name: "Espelli_utente",
    fullcmd: "espelli_utente",
    alias: "kick",
    description: texts.getText("command_moderazione_espelli_utenti_description"),
    timer: 0,
    tokenCost: 0,
    subClass: 'help_moderazione',
    displayHelp: 1
};