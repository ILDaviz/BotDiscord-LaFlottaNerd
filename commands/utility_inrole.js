const Discord  = require('discord.js');
const botModel = require('../helpers/Models');
const botUtili = require('../helpers/Util');
const botCache = require('../helpers/Cache');

exports.run = async (message, bot) => {
	const args = message.content.slice(bot.conf.prefix.length).trim().split(/ +/g);
  	const args_1 = args.slice(1).join(' ');
	const args_2 = args.slice(1).join(' ');  
	  
	if (!message.member.roles.some(r => ["Admin", "Moderatori", "Aiutante di Bordo", "Developer"].includes(r.name)))
      return message.reply("Mi dispiace, non hai i permessi per inviare questo comando");
	
	let roleName = args_1;
    let membersWithRole = message.guild.members.filter(member => {
      return member.roles.find(x => x.name === roleName);
    }).map(member => {
      return member.user.username;
    });
    var numbers_user = 0;
    for (let i = membersWithRole.length - 1; i >= 0; i--) {
      numbers_user = numbers_user + 1;
    }
    let embed = new Discord.RichEmbed({
      "title": `Utenti nell ruolo: ${roleName}`,
      "description": membersWithRole.join("; "),
      "color": 0xFFFF
    }).addField("Numero utenti", numbers_user);
    return message.channel.send({ embed });
};

exports.conf = {
    name: "Inrole",
    fullcmd: "inrole",
    alias: "inrole",
    description: "[nome ruolo (il nome deve essere esatto)] Mostra gli utenti presenti in un ruolo",
    timer: 0,
    tokenCost: 0,
    subClass: 'help_utility',
    displayHelp: 1
};