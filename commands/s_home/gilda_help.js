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
        if (cmd.displayHelp === 1 && cmd.subClass === 'help_gilda') {
            msg += `\n\n**^${cmd.cmdName}** ${cmd.description}`;
        }
    });

    let emb = new Discord.RichEmbed()
        .setTitle(`Non sai cosa fare o non sai come fare? Usa questo comando! Allora:`)
        .setDescription(msg)
        .setFooter(bot.conf.footer_standard);
    message.channel.send(emb);
};

exports.conf = {
    name: "Guida_help",
    fullcmd: "guida_help",
    alias: "faq",
    description: "Non sai come o cosa fare? Sei nel comando giusto!",
    timer: 0,
    tokenCost: 0,
    subClass: 'start',
    displayHelp: 0
};