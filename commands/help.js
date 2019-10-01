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
        if (cmd.displayHelp === 1 && cmd.subClass === 'help') {
            msg += `\n\n**^${cmd.cmdName}** [**^${cmd.alias}**] - ${cmd.description}`;
        }
    });

    let emb = new Discord.RichEmbed()
        .setTitle(`Ecco tutti gli Help disponibili`)
        .setDescription(msg)
        .setFooter(bot.conf.footer_standard);

    message.channel.send(emb);
};

exports.conf = {
    name: "Help",
    fullcmd: "help",
    alias: "help",
    description: "Mostra tutti i sotto-comandi disponibili",
    timer: 0,
    tokenCost: 999,
    subClass: 'start',
    displayHelp: 1
};