let cmds = require('../helpers/loadcommands').cmdDetail;
let Discord = require('discord.js');

exports.run = async (message, bot) => {

    let emb = new Discord.RichEmbed()
        .setTitle(`Ecco tutti gli Help disponibili`)
        .setDescription('');

    message.channel.send(emb);
};

exports.conf = {
    name: "Seleziona_gioco",
    fullcmd: "seleziona_gioco",
    alias: "sgame",
    description: ":bangbang: **importante!** Usa questo comando per avere la lista dei giochi disponibili, poi segui le istruzzioni indicate per entrare nel canale dedicato",
    timer: 0,
    tokenCost: 0,
    subClass: 'start',
    displayHelp: 1
};