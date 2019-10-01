let cmds = require('../helpers/loadcommands').cmdDetail;
let Discord = require('discord.js');

exports.run = async (message, bot) => {

    let emb = new Discord.RichEmbed()
        .setTitle(`I comandi per le classifiche sono`)
        .setDescription('');

    message.channel.send(emb);
};

exports.conf = {
    name: "Cambia_nickname",
    fullcmd: "cambia_nickname",
    alias: "cnick",
    description: "Cambia il soprannome in questa gilda, ci penso io a tutto!",
    timer: 0,
    tokenCost: 0,
    subClass: 'start',
    displayHelp: 1
};