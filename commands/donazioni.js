let cmds = require('../helpers/loadcommands').cmdDetail;
let Discord = require('discord.js');

exports.run = async (message, bot) => {

    let emb = new Discord.RichEmbed()
        .setTitle(`I comandi per le classifiche sono`)
        .setDescription('');

    message.channel.send(emb);
};

exports.conf = {
    name: "Donazioni",
    fullcmd: "donazioni",
    alias: "donaz",
    description: "Ti piace il Bot di questa gilda? Offrimi un caffé!",
    timer: 0,
    tokenCost: 10,
    subClass: 'start',
    displayHelp: 1
};