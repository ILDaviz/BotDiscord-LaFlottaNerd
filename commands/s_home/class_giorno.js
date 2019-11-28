const cmds = require('../../helpers/loadcommands').cmdDetail;
const Discord = require('discord.js');
const botModel = require('../../helpers/Models');
const texts = require("../../helpers/Texts");

exports.run = async (message, bot) => {
    const m = await message.channel.send("Attendi..");
    botModel.seletTopListMessageDay(function (err, res) {
        if (err) {
            return message.channel.send('errore_text' + err);
        }
        var post = 10;
        var messages_text = "Eccola la classifica top 10:\n";
        messages_text += "----------\n";
        for (let i = res.length - 1; i >= 0; i--) {
            let id_discord = res[i].id_discord;
            let messages = res[i].messages_day;
            messages_text += "Posizione: " + post + " - Nome <@" + id_discord + "> - messaggi:  " + messages + "\n";
            var post = post - 1;
        }
        messages_text += "----------\n";
        messages_text += "Ti sei posizionato bene?\n";
        m.edit(messages_text);
    });
};

exports.conf = {
    name: "Class_giorno",
    fullcmd: "class_giorno",
    alias: "gtime",
    description: texts.getText("command_s_home_giorno_description"),
    timer: 0,
    tokenCost: 0,
    subClass: 'start',
    displayHelp: 1
};