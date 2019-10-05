let cmds = require('../helpers/loadcommands').cmdDetail;
let Discord = require('discord.js');

exports.run = async (message, bot) => {
    
    const args = message.content.slice(bot.conf.prefix.length).trim().split(/ +/g);
    const args_1 = args.slice(1).join(' ');
    const args_2 = args.slice(2).join(' ');
    
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
        .setTitle(`Impostazioni del bot`)
        .setColor('RANDOM')
        .setDescription(msg)
        .setFooter(bot.conf.footer_standard);
    message.channel.send(emb);
};

exports.conf = {
    name: "Impostazioni",
    fullcmd: "impostazioni",
    alias: "settings",
    description: "Mostra tutti i comandi per le impostazioni del Bot.",
    timer: 0,
    tokenCost: 0,
    subClass: 'admin',
    displayHelp: 1
};