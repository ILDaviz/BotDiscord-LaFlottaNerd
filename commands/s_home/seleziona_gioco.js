const Discord  = require('discord.js');
const botModel = require('../../helpers/Models');
const botUtili = require('../../helpers/Util');
//const botCache = require('../../helpers/Cache');
const texts = require("../../helpers/Json");
const emoji = ['👹','🕹','🖥','🌃','🎆','🐲','🐗','🌵','💣','🔪','🔋','🔌','🗡','📼'];
const toSend = botUtili.generaMessaggioSelezionaGiocoSmall(emoji);
//const role = botCache.selectCacheRole('role');
const role_n = role.length;

const associate_role = []
for (let i = 0; i < role.length; i++) {
    associate_role.push({'role':role[i],'emoji':emoji[i]});
}

exports.a_role = () => {
    return associate_role;
}

exports.emoji = () => {
    return emoji;
}

exports.run = async (message, bot) => {    

    message.channel.send(toSend)
    .then(function (message) {
        for (let i = 0; i < role.length; i++) {
            message.react(emoji[i]);
        }

        const filter = (reaction, user) => {
            
        };

        message.awaitReactions(filter, { max: role_n, time: 60000, errors: ['time'] })
        .then(collected => {
        })
        .catch(collected => {
        });
    }).catch(function() {
        //Something
        });
};

exports.conf = {
    name: "Seleziona_gioco",
    fullcmd: "seleziona_gioco",
    alias: "sgame",
    description: texts.getText("command_s_home_seleziona_gioco_description"),
    timer: 0,
    tokenCost: 0,
    subClass: 'start',
    displayHelp: 1
};