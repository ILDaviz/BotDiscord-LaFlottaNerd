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
        if (cmd.displayHelp === 1 && cmd.subClass === 'utility_staff') {
            msg += `\n\n**${bot.conf.prefix}${cmd.cmdName}** [**${bot.conf.prefix}${cmd.alias}**] - ${cmd.description}`;
        }
    });

    let emb = new Discord.RichEmbed()
        .setTitle(`Comandi utili per lo staff.`)
        .setColor('RANDOM')
        .setDescription(msg)
        .setFooter(bot.conf.footer_standard);

    message.channel.send(emb);
};

exports.conf = {
    name: "Utility_staff",
    fullcmd: "utility_staff",
    alias: "ustaff",
    description: "Comandi utili per lo staff.",
    timer: 0,
    tokenCost: 999,
    subClass: 'admin',
    displayHelp: 1
};