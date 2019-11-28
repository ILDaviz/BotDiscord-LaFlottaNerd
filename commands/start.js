const cmds = require('../helpers/loadcommands').cmdDetail;
const Discord = require('discord.js');
const texts = require("../helpers/Texts");

exports.run = async (message, bot) => {
    
    let msg = '';
    cmds.sort((a,b)=>{
        return b.cost < a.cost? 1
            : b.cost > a.cost ? -1
            :0;
    });

    cmds.forEach((cmd) => {
        if (cmd.displayHelp === 1 && cmd.subClass === 'start') {
            msg += `\n\n**${bot.conf.prefix}${cmd.cmdName}** ${cmd.description}`;
        }
    });
    
    let emb = new Discord.RichEmbed()
        .setTitle(texts.getText('command_start_title'))
        .setThumbnail('https://media1.tenor.com/images/0edd53dd2110147b786329c2e24fb1d0/tenor.gif')
        .setColor("RANDOM")
        .setDescription(msg)
        .setTimestamp()
        .setFooter(bot.conf.footer_standard);
    message.channel.send(emb);
};

exports.conf = {
    name: "Start",
    fullcmd: "start",
    alias: "s",
    description: texts.getText('command_start_description'),
    timer: 0,
    tokenCost: 0,
    subClass: 'start',
    displayHelp: 1
};