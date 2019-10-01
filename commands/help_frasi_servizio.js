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
        if (cmd.displayHelp === 1 && cmd.subClass === 'help_frasi_servizio') {
            msg += `\n\n**^${cmd.cmdName}** [**^${cmd.alias}**] - ${cmd.description}`;
        }
    });

    let emb = new Discord.RichEmbed()
        .setTitle(`Ecco i comandi per le frasi di servizio`)
        .setDescription(msg)
        .setFooter(bot.conf.footer_standard);
    message.channel.send(emb);
};

exports.conf = {
    name: "Help_frasi_servizio",
    fullcmd: "help_frasi_servizio",
    alias: "hfras",
    description: "Mostra tutti i comandi per le frasi di servizio",
    timer: 0,
    tokenCost: 0,
    subClass: 'help',
    displayHelp: 1
};