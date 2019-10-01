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
        if (cmd.displayHelp === 1 && cmd.subClass === 'help_impostazioni') {
            msg += `\n\n**^${cmd.cmdName}** [**^${cmd.alias}**] - ${cmd.description}`;
        }
    });

    let emb = new Discord.RichEmbed()
        .setTitle(`Impostazioni del bot`)
        .setDescription(msg)
        .setFooter(bot.conf.footer_standard);
    message.channel.send(emb);
};

exports.conf = {
    name: "Help_impostazioni",
    fullcmd: "help_impostazioni",
    alias: "himp",
    description: "Mostra tutti i comandi per le impostazioni del bot",
    timer: 0,
    tokenCost: 0,
    subClass: 'help',
    displayHelp: 1
};