const cmds = require('../helpers/loadCommands').cmdDetail;
const Discord = require('discord.js');
const texts = require("../helpers/json");

exports.run = async (message, bot) => {

    let msg = '';
    cmds.sort((a,b)=>{
        return b.cost < a.cost? 1
            : b.cost > a.cost ? -1
            :0;
    });

    cmds.forEach((cmd) => {
        if (cmd.displayHelp === 1 && cmd.subClass === 'admin') {
            msg += `\n\n**${bot.conf.prefix}${cmd.cmdName}**  [**${bot.conf.prefix}${cmd.alias}**] ${cmd.description}`;
        }
    });

    let emb = new Discord.RichEmbed()
        .setTitle(texts.getText('command_administrator_title'))
        .setThumbnail('https://media1.tenor.com/images/0edd53dd2110147b786329c2e24fb1d0/tenor.gif')
        .setColor('RANDOM')
        .setDescription(msg)
        .setTimestamp()
        .setFooter(bot.conf.footer_standard);
    message.channel.send(emb);
};

exports.conf = {
    name: "Admin",
    fullcmd: "admin",
    alias: "admin",
    description: texts.getText('command_administrator_description'),
    timer: 0,
    tokenCost: 999,
    subClass: 'start',
    displayHelp: 1
};