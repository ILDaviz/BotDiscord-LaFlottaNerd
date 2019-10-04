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
        if (cmd.displayHelp === 1 && cmd.subClass === 'start') {
            msg += `\n\n**${bot.conf.prefix}${cmd.cmdName}** [**?${cmd.alias}**] - ${cmd.description}`;
        }
    });
    
    let emb = new Discord.RichEmbed()
        .setTitle(`Ciao io sono il BOT della GILDA! :heart:`)
        .setThumbnail('https://media1.tenor.com/images/0edd53dd2110147b786329c2e24fb1d0/tenor.gif')
        .setColor("RANDOM")
        .setDescription(msg)
        .setTimestamp()
        .setFooter(bot.conf.footer_standard);

    message.channel.send(emb);
};

exports.conf = {
    name: "Start",
    fullcmd: "start",
    alias: "s",
    description: "Il comando per iniziare ad usarmi! :stuck_out_tongue_winking_eye: ",
    timer: 0,
    tokenCost: 0,
    subClass: 'start',
    displayHelp: 1
};