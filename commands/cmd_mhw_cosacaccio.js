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
        if (cmd.displayHelp === 1 && cmd.subClass === 'funzioni_mhw') {
            msg += `\n\n**^${cmd.cmdName}** [**^${cmd.alias}**] - ${cmd.description}`;
        }
    });

    let emb = new Discord.RichEmbed()
        .setTitle(`I comandi dedicati a Monster Hunter World sono`)
        .setDescription(msg)
        .setFooter(bot.conf.footer_standard);
    message.channel.send(emb);
};

exports.conf = {
    name: "Comandi_mhw",
    fullcmd: "comandi_mhw",
    alias: "cmdmhw",
    description: "I comandi dedicati a Monster Hunter World!",
    timer: 0,
    tokenCost: 0,
    subClass: 'comandi_gionci',
    displayHelp: 1
};