let cmds = require('../helpers/loadcommands').cmdDetail;
let Discord = require('discord.js');
let botModel = require('../helpers/Models');

exports.run = async (message, bot) => {
    let id_monster = Math.floor(Math.random() * 34);
    botModel.selectMonster(id_monster, function (err, res) {
        if (err) {
            return message.channel.send('errore_text' + err);
        }
        let name = res.map(a => a.name);
        message.channel.send("Ciao " + message.member.user + "! Per me oggi dovresti cacciare un **" + name + "** ! :kissing_heart:");
    });
};

exports.conf = {
    name: "Cmd_mhwcc",
    fullcmd: "cmd_mhwcc",
    alias: "mhwcc",
    description: "Non sai cosa cacciare? Ti consiglio io!",
    timer: 0,
    tokenCost: 0,
    subClass: 'comandi_mhw',
    displayHelp: 1
};