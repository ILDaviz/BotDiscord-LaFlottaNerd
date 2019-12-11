const cmds = require('../../helpers/loadcommands').cmdDetail;
const Discord = require('discord.js');
const texts = require("../../helpers/json");

exports.run = async (message, bot) => {
    
    let msg = '';

    cmds.sort((a,b)=>{
        return b.cost < a.cost? 1
            : b.cost > a.cost ? -1
            :0;
    });
    
    cmds.forEach((cmd) => {
        if (cmd.displayHelp === 1 && cmd.subClass === 'impostazioni') {
            msg += `\n\n**${bot.conf.prefix}${cmd.cmdName}** [**${bot.conf.prefix}${cmd.alias}**] ${cmd.description}`;
        }
    });

    let emb = new Discord.RichEmbed()
        .setTitle(texts.getText('command_impostazioni_title'))
        .setColor('RANDOM')
        .setDescription(msg)
        .setFooter(bot.conf.footer_standard);
    message.channel.send(emb);
};

exports.conf = {
    name: "Impostazioni",
    fullcmd: "impostazioni",
    alias: "settings",
    description: texts.getText('command_impostazioni_descrizione'),
    timer: 0,
    tokenCost: 0,
    subClass: 'admin',
    displayHelp: 1
};