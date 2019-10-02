let cmds = require('../helpers/loadcommands').cmdDetail;
let Discord = require('discord.js');

exports.run = async (message, bot) => {
    const args = message.content.slice(bot.conf.prefix.length).trim().split(/ +/g);
const args_1 = args.slice(1).join(' ');
const args_2 = args.slice(2).join(' ');
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