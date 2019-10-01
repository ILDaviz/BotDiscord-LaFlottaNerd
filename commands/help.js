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
        msg += `\n\n**^${cmd.cmdName}** [**^${cmd.alias}**] [${cmd.cost}] - ${cmd.description}`
    });

    let emb = new Discord.RichEmbed()
        .setTitle(`Ecco tutti gli Help disponibili`)
        .setDescription(msg);

    message.channel.send(emb);
};

exports.conf = {
    name: "Help",
    fullcmd: "help",
    alias: "cmds",
    description: "mostra tutti i comandi disponibili",
    timer: 300,
    tokenCost: 0
};