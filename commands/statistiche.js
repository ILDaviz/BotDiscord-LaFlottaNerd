let cmds = require('../helpers/loadcommands').cmdDetail;
let Discord = require('discord.js');

exports.run = async (message, bot) => {

    let emb = new Discord.RichEmbed()
        .setTitle(`I comandi per le classifiche sono`)
        .setDescription('');

    message.channel.send(emb);
};

exports.conf = {
    name: "Statistiche",
    fullcmd: "statistiche",
    alias: "stat",
    description: "Le tue statistiche! dati, dati un sacco di dati :nerd:",
    timer: 0,
    tokenCost: 0,
    subClass: 'start',
    displayHelp: 1
};