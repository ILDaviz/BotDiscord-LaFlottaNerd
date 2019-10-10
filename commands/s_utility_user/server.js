const Discord  = require('discord.js');
const botModel = require('../../helpers/Models');
const botUtili = require('../../helpers/Util');
const botCache = require('../../helpers/Cache');

exports.run = async (message, bot) => {
  function checkDays(date) {
      let now = new Date();
      let diff = now.getTime() - date.getTime();
      let days = Math.floor(diff / 86400000);
      return days + (days == 1 ? "giorno" : " giorni") + "fa";
  };
  let verifLevels = ["None", "Low", "Medium", "(╯°□°）╯︵  ┻━┻", "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻"];
  const embed = new Discord.RichEmbed()
        .setAuthor(message.guild.name, message.guild.iconURL)
        .setColor('RANDOM')
        .addField("Name", message.guild.name, true)
        .addField("ID", message.guild.id, true)
        .addField("Admin", `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`, true)
        .addField("Totali | Umani | Bots", `${message.guild.members.size} | ${message.guild.members.filter(member => !member.user.bot).size} | ${message.guild.members.filter(member => member.user.bot).size}`, true)
        .addField("Livelli di verificazione", verifLevels[message.guild.verificationLevel], true)
        .addField("Canali", message.guild.channels.size, true)
        .addField("Roles", message.guild.roles.size, true)
        .addField("Creato li", `${message.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkDays(message.channel.guild.createdAt)})`, true)
        .setThumbnail(message.guild.iconURL)
    message.channel.send({embed});
};

exports.conf = {
    name: "Server",
    fullcmd: "server",
    alias: "sinfo",
    description: "In quanti siamo qui su discord? Ecco la rispsota :D",
    timer: 0,
    tokenCost: 0,
    subClass: 'help_utility',
    displayHelp: 1
};