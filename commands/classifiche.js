let cmds = require('../helpers/loadcommands').cmdDetail;
let Discord = require('discord.js');

exports.run = async (message, bot) => {

    let emb = new Discord.RichEmbed()
        .setTitle(`I comandi per le classifiche sono`)
        .setDescription('');

    message.channel.send(emb);
};

exports.conf = {
    name: "Classifiche",
    fullcmd: "classifiche",
    alias: "class",
    description: "Mostra le classifiche",
    timer: 0,
    tokenCost: 0,
    subClass: 'start',
    displayHelp: 1
};