const Discord  = require('discord.js');
const botModel = require('../helpers/Models');
const botUtili = require('../helpers/Util');
const botCache = require('../helpers/Cache');

exports.run = async (message, bot) => {
  let risposta = botUtili.getRispose();
  let embed = new Discord.RichEmbed()
    .setTitle('Il gioco della palla da otto')
    .setColor('RANDOM')
    .setDescription('La mia risposta è.. ' + risposta + '.')
  message.channel.send({ embed });
};

exports.conf = {
    name: "Palla_otto",
    fullcmd: "palla_otto",
    alias: "pool",
    description: "Sei indeciso? Ci penserà la palla da otto a darti una risposta!",
    timer: 0,
    tokenCost: 0,
    subClass: 'help_utility',
    displayHelp: 1
};