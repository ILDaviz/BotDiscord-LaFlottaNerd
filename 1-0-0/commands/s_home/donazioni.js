let cmds = require('../../helpers/loadcommands').cmdDetail;
let Discord = require('discord.js');

exports.run = async (message, bot) => {

    let emb = new Discord.RichEmbed()
        .setTitle(`Ti ringrazio solo per aver usato questo comando `)
        .setColor('RANDOM')
        .setDescription("Ti piacciono i Bot di questo server e le loro funzioni? Offri un caffè al nostro Developer IlDikozzo (David). :D Essi sono scritti da lui interamente a mano con tanto sudore e impegno, se apprezzi quello che ha fatto, ti lascio sotto un link con la possibilità di offrirgliene uno (ovviamente è facoltativo). Il link per le donazioni è : https://paypal.me/pools/c/8cIM0hcInS :100: GRAZIE!!!");
    message.channel.send(emb);
};

exports.conf = {
    name: "Donazioni",
    fullcmd: "donazioni",
    alias: "dammiisoldi",
    description: "Ti piace il Bot di questa Gilda? Offri un caffé allo sviluppatore che lo ha creato!",
    timer: 0,
    tokenCost: 10,
    subClass: 'start',
    displayHelp: 1
};