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
        if (cmd.displayHelp === 1 && cmd.subClass === 'help_gilda') {
            msg += `\n\n**^${cmd.cmdName}** [**^${cmd.alias}**] - ${cmd.description}`;
        }
    });

    let emb = new Discord.RichEmbed()
        .setTitle(`Non sai cosa fare o non sai come fare? Ti consiglio io! Allora:`)
        .setDescription(msg);

    message.channel.send(emb);
};

exports.conf = {
    name: "Help_gilda",
    fullcmd: "help_gilda",
    alias: "hgild",
    description: "Non sai cosa fare o non sai come fare? Ti consiglio io!",
    timer: 400,
    tokenCost: 0,
    subClass: 'help',
    displayHelp: 1
};