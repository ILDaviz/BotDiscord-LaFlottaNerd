const cmds = require('../../helpers/loadcommands').cmdDetail;
const Discord = require('discord.js');
const texts = require("../../helpers/Texts");

exports.run = async (message, bot) => {

    let msg = '';
    cmds.sort((a,b)=>{
        return b.cost < a.cost? 1
            : b.cost > a.cost ? -1
            :0;
    });

    cmds.forEach((cmd) => {
        if (cmd.displayHelp === 1 && cmd.subClass === 'scorciatoie') {
            msg += `\n\n**${bot.conf.prefix}${cmd.cmdName}** [**${bot.conf.prefix}${cmd.alias}**] - ${cmd.description}`;
        }
    });

    let emb = new Discord.RichEmbed()
        .setTitle(texts.getText(`Comandi dedicati per le scorciatoie`))
        .setColor('RANDOM')
        .setDescription(msg)
        .setFooter(bot.conf.footer_standard);

    message.channel.send(emb);
};

exports.conf = {
    name: "Scorciatoie",
    fullcmd: "scorciatoie",
    alias: "sc",
    description: texts.getText('Comandi dedicati per le scorciatoie'),
    timer: 0,
    tokenCost: 999,
    subClass: 'admin',
    displayHelp: 1
};