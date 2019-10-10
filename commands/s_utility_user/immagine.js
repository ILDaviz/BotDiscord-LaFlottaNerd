const botImg = require('../../helpers/GetImg');
let Discord = require('discord.js');

exports.run = async (message, bot) => {
  const args = message.content.slice(bot.conf.prefix.length).trim().split(/ +/g);
  const args_1 = args.slice(1).join(' ');
  let url = await botImg.getImg(args_1);
  let emb = new Discord.RichEmbed()
    .setTitle(`Ecco la foto che hai richiesto!`)
    .setColor('RANDOM')
    .setImage(url)
  message.channel.send(emb);
};

exports.conf = {
    name: "Immagine",
    fullcmd: "immagine",
    alias: "img",
    description: "Vuoi una immagine? Scrivi il comando e di seguito dopo uno spazio il contesto dell\'immagine che vuoi avere",
    timer: 0,
    tokenCost: 0,
    subClass: 'help_utility',
    displayHelp: 1
};