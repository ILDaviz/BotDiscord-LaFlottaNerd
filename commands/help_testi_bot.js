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
        if (cmd.displayHelp === 1 && cmd.subClass === 'help_testi_bot') {
            msg += `\n\n**^${cmd.cmdName}** [**^${cmd.alias}**] - ${cmd.description}`;
        }
    });

    let emb = new Discord.RichEmbed()
        .setTitle(`Ecco tutti i comandi per modificare i testi del bot`)
        .setDescription(msg);

    message.channel.send(emb);
};

exports.conf = {
    name: "Help_testi_bot",
    fullcmd: "help_testi_bot",
    alias: "htes",
    description: "Mostra tutti i comandi per modificare i testi del bot",
    timer: 400,
    tokenCost: 0,
    subClass: 'help',
    displayHelp: 1
};