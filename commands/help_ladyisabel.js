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
        if (cmd.displayHelp === 1 && cmd.subClass === 'help_ladyisabel') {
            msg += `\n\n**^${cmd.cmdName}** [**^${cmd.alias}**] - ${cmd.description}`;
        }
    });

    let emb = new Discord.RichEmbed()
        .setTitle(`Ecco i miei comandi disponbili`)
        .setDescription(msg);

    message.channel.send(emb);
};

exports.conf = {
    name: "Help_ladyisabel",
    fullcmd: "help_ladyisabel",
    alias: "hlady",
    description: "Mostra tutti i miei comandi per giocare con me!",
    timer: 400,
    tokenCost: 0,
    subClass: 'help',
    displayHelp: 1
};