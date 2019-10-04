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
        if (cmd.displayHelp === 1 && cmd.subClass === 'admin') {
            msg += `\n\n**${bot.conf.prefix}${cmd.cmdName}** [**${bot.conf.prefix}${cmd.alias}**] - ${cmd.description}`;
        }
    });

    let emb = new Discord.RichEmbed()
        .setTitle(`Ecco tutti gli altri comandi disponibili`)
        .setColor('RANDOM')
        .setDescription(msg)
        .setFooter(bot.conf.footer_standard);

    message.channel.send(emb);
};

exports.conf = {
    name: "Administrator",
    fullcmd: "administrator",
    alias: "admin",
    description: "Comandi per la gestione del server (Accesso limitato)",
    timer: 0,
    tokenCost: 999,
    subClass: 'start',
    displayHelp: 1
};