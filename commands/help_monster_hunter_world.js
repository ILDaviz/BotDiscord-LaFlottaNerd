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
        if (cmd.displayHelp === 1 && cmd.subClass === 'help_mhw') {
            msg += `\n\n**^${cmd.cmdName}** [**^${cmd.alias}**] - ${cmd.description}`;
        }
    });

    let emb = new Discord.RichEmbed()
        .setTitle(`I comandi dedicati a Monster Hunter World sono`)
        .setDescription(msg);

    message.channel.send(emb);
};

exports.conf = {
    name: "Help_mhw",
    fullcmd: "help_mhw",
    alias: "hmhw",
    description: "I comandi dedicati a Monster Hunter World!",
    timer: 400,
    tokenCost: 0,
    subClass: 'help',
    displayHelp: 1
};