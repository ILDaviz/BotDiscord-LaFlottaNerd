let cmds = require('../../helpers/loadcommands').cmdDetail;
let Discord = require('discord.js');

exports.run = async (message, bot) => {

    let msg = '';
    cmds.sort((a,b)=>{
        return b.cost < a.cost? 1
            : b.cost > a.cost ? -1
            :0;
    });
    cmds.forEach((cmd) => {
        console.log(cmd)
        if (cmd.displayHelp === 1 && cmd.subClass === 'help_moderazione') {
            msg += `\n\n**${bot.conf.prefix}${cmd.cmdName}** [**${bot.conf.prefix}${cmd.alias}**] ${cmd.description}`;
        }
    });

    let emb = new Discord.RichEmbed()
        .setTitle(`Ecco i comandi di moderazione`)
        .setColor('RANDOM')
        .setDescription(msg)
        .setFooter(bot.conf.footer_standard);
    message.channel.send(emb);
};

exports.conf = {
    name: "Moderazione",
    fullcmd: "moderazione",
    alias: "mod",
    description: "Mostra tutti i comandi per la moderazione.",
    timer: 0,
    tokenCost: 0,
    subClass: 'admin',
    displayHelp: 1
};