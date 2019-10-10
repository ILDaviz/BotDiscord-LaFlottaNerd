const botImg = require('../../helpers/GetImg');
let Discord = require('discord.js');

exports.run = async (message, bot) => {
  let url = await botImg.getImg('pizza');
  let id_author = message.member.id;
  if (message.mentions.members.first()) {
    console.log('ugo');
    let id_mention = message.mentions.members.first().id;
    let emb = new Discord.RichEmbed()
      .setTitle("Ecco una fetta di :pizza: hai già fame?")
      .setDescription('Ciao <@' + id_mention + '> sei fortunato, l\'utente <@' + id_author + '> ti ha offerto una :pizza:')
      .setColor('RANDOM')
      .setImage(url)
    message.channel.send(emb);
  } else {
    let emb = new Discord.RichEmbed()
      .setTitle(`Ecco una fetta di :pizza: hai già fame? Io si!`)
      .setColor('RANDOM')
      .setImage(url)
    message.channel.send(emb);
  }
};

exports.conf = {
    name: "Pizza",
    fullcmd: "pizza",
    alias: "pizz",
    description: "Usa questo comando per avere una pizza in foto :pizza:",
    timer: 0,
    tokenCost: 0,
    subClass: 'help_utility',
    displayHelp: 1
};