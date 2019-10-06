let cmds = require('../helpers/loadcommands').cmdDetail;
let Discord = require('discord.js');
let botModel = require('../helpers/Models');

exports.run = async (message, bot) => {

    const args = message.content.slice(bot.conf.prefix.length).trim().split(/ +/g);
    const args_3 = args.slice(1).join(' ');

    if (!message.member.roles.some(r => ["Admin", "Developer","Moderatori"].includes(r.name)))
        return message.reply("Mi dispiace, ma non hai le autorizzazioni per usare questo comando.");
    if (!args_3) {
        return message.reply("Devi indicarmi del testo..");
    }
    botModel.insertSetting('scorciatoia', 'scorciatoia_' + message.member.id , args_3, function (err, res) {
        if (err) {
            return message.channel.send('errore_text' + err);
        }
        message.channel.send("Scorciatoia aggiunta il suo riferimento è **" + res + "** usalo con il comando !stsc " + res + ".");
    });

};

exports.conf = {
    name: "Aggiungi_scorciatoia",
    fullcmd: "aggiungi_scorciatoia",
    alias: "adsc",
    description: "{testo} Crea una scorciatoia, il comando ti resituisce l'id di riferimento numerico.",
    timer: 0,
    tokenCost: 0,
    subClass: 'scorciatoie',
    displayHelp: 1
};