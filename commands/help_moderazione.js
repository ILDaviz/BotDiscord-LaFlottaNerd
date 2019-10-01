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
        if (cmd.displayHelp === 1 && cmd.subClass === 'help_moderazione') {
            msg += `\n\n**^${cmd.cmdName}** [**^${cmd.alias}**] - ${cmd.description}`;
        }
    });

    let emb = new Discord.RichEmbed()
        .setTitle(`Ecco i comandi di moderazione`)
        .setDescription(msg);

    message.channel.send(emb);
};

exports.conf = {
    name: "Help_moderazione",
    fullcmd: "help_moderazione",
    alias: "hmod",
    description: "Mostra tutti i comandi per la moderazione",
    timer: 350,
    tokenCost: 0,
    subClass: 'help',
    displayHelp: 1
};