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
        if (cmd.displayHelp === 1 && cmd.subClass === 'donazioni') {
            msg += `\n\n**^${cmd.cmdName}** [**^${cmd.alias}**] - ${cmd.description}`;
        }
    });

    let emb = new Discord.RichEmbed()
        .setTitle(`I comandi per le classifiche sono`)
        .setDescription(msg);

    message.channel.send(emb);
};

exports.conf = {
    name: "Donazioni",
    fullcmd: "donazioni",
    alias: "donaz",
    description: "Ti piace il Bot di questa gilda? Offrimi un caffé!",
    timer: 400,
    tokenCost: 10,
    subClass: 'help',
    displayHelp: 1
};