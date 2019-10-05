let cmds = require('../helpers/loadcommands').cmdDetail;
let Discord = require('discord.js');

exports.run = async (message, bot) => {

    let msg = '';
    
    cmds.sort((a,b)=>{
        return b.cost < a.cost? 1
            : b.cost > a.cost ? -1
            :0;
    });

    cmds.forEach((cmd) => {
        if (cmd.displayHelp === 1 && cmd.subClass === 'comandi_giochi') {
            msg += `\n\n**${bot.conf.prefix}${cmd.cmdName}** ${cmd.description}`;
        }
    });

    let emb = new Discord.RichEmbed()
        .setTitle(`Ecco i comandi dedicati ai giochi della gilda suddivisi per gioco.`)
        .setColor('RANDOM')
        .setDescription(msg)
        .setFooter(bot.conf.footer_standard);
    message.channel.send(emb);
};

exports.conf = {
    name: "Cmd_giochi",
    fullcmd: "cmd_giochi",
    alias: "cmdgame",
    description: "Entra nei comandi dedicati di ogni gioco.",
    timer: 0,
    tokenCost: 0,
    subClass: 'start',
    displayHelp: 1
};