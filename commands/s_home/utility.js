let cmds = require('../../helpers/loadcommands').cmdDetail;
let Discord = require('discord.js');

exports.run = async (message, bot) => {

    let msg = '';
    cmds.sort((a, b) => {
        return b.cost < a.cost ? 1
            : b.cost > a.cost ? -1
                : 0;
    });
    cmds.forEach((cmd) => {
        if (cmd.displayHelp === 1 && cmd.subClass === 's_utility') {
            msg += `\n\n**${bot.conf.prefix}${cmd.cmdName}** ${cmd.description}`;
        }
    });

    let emb = new Discord.RichEmbed()
        .setTitle(`Ecco altri comandi utili!`)
        .setColor('RANDOM')
        .setDescription(msg)
        .setFooter(bot.conf.footer_standard);
    message.channel.send(emb);
};

exports.conf = {
    name: "Utility",
    fullcmd: "utility",
    alias: "u",
    description: "Una lista di comandi secondari utili.",
    timer: 0,
    tokenCost: 0,
    subClass: 'start',
    displayHelp: 1
};