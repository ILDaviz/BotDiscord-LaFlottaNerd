const cmds = require('../../helpers/loadcommands').cmdDetail;
const Discord = require('discord.js');
const botModel = require('../../helpers/Models');
const texts = require("../../helpers/Json");

exports.run = async (message, bot) => {
    const m = await message.channel.send("Attendi..");
    botModel.seletTopListMessageAllTime(function (err, res) {
        if (err) {
            return message.channel.send('errore_text' + err);
        }
        var post = 10;
        var messages_text = "Eccola la classifica top 10:\n";
        messages_text += "----------\n";
        for (let i = res.length - 1; i >= 0; i--) {
            let id_discord = res[i].id_discord;
            let messages = res[i].messages;
            messages_text += "Posizione: " + post + " - Nome <@" + id_discord + "> - messaggi:  " + messages + "\n";
            var post = post - 1;
        }
        messages_text += "----------\n";
        messages_text += "Ti sei posizionato bene?\n";
        m.edit(messages_text);
    });
};

exports.conf = {
    name: "Class_alltime",
    fullcmd: "class_alltime",
    alias: "ctime",
    description: texts.getText("command_s_home_alltime_description"),
    timer: 0,
    tokenCost: 0,
    subClass: 'start',
    displayHelp: 1
};