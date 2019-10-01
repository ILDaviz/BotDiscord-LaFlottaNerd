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
        if (cmd.displayHelp === 1 && cmd.subClass === 'help_classifiche') {
            msg += `\n\n**^${cmd.cmdName}** [**^${cmd.alias}**] - ${cmd.description}`;
        }
    });

    let emb = new Discord.RichEmbed()
        .setTitle(`I comandi per le classifiche sono`)
        .setDescription(msg);

    message.channel.send(emb);
};

exports.conf = {
    name: "Help_classifiche",
    fullcmd: "help_classifiche",
    alias: "hclss",
    description: "Mostra tutti i comandi per le classifiche della gilda",
    timer: 400,
    tokenCost: 0,
    subClass: 'help',
    displayHelp: 1
};