
const botModel = require('../../helpers/Models');
const botUtili = require('../../helpers/Util');
const texts = require("../../helpers/Json");

exports.run = async (message, bot) => {
  const args = message.content.slice(bot.conf.prefix.length).trim().split(/ +/g);
  if (!message.member.roles.some(r => ["Admin", "Moderatori", "Aiutante di Bordo", "Developer"].includes(r.name)))
    return message.reply("Mi dispiace, non hai i permessi per inviare questo comando");
  let member = message.mentions.members.first() || message.guild.members.get(args[0]);
  if (!member)
    return message.reply("Menziona un utente presente nel server");
  botModel.insertUserWhiteList(member.user.id, member.user.tag, function (err, res) {
    if (err) {
      return message.reply(`${member.user.tag} non è stato inserito in Whitelist da ${message.author.tag} a causa di questo errore ${err}.`);
    }

    message.reply(`${member.user.tag} è stato inserito in Whitelist da ${message.author.tag}.`);

  });
  botUtili.log(`${member.user.tag} è stato inserito in Whitelist da ${message.author.tag}.`);
};

exports.conf = {
  name: "Aggiungi_whitelist",
  fullcmd: "aggiungi_whitelist",
  alias: "addwl",
  description: texts.getText("command_whitelist_aggiungi_description"),
  timer: 0,
  tokenCost: 0,
  subClass: 'help_moderazione',
  displayHelp: 1
};