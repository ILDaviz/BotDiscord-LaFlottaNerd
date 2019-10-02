let cmds = require('../helpers/loadcommands').cmdDetail;
let Discord = require('discord.js');

exports.run = async (message, bot) => {
    
    const args = message.content.slice(bot.conf.prefix.length).trim().split(/ +/g);
    const args_1 = args.slice(1).join(' ');
    const args_2 = args.slice(1).join(' ');
    
    let msg = '';
    cmds.sort((a,b)=>{
        return b.cost < a.cost? 1
            : b.cost > a.cost ? -1
            :0;
    });

    cmds.forEach((cmd) => {
        if (cmd.displayHelp === 1 && cmd.subClass === 'start') {
            msg += `\n\n**^${cmd.cmdName}** [**^${cmd.alias}**] - ${cmd.description}`;
        }
    });
    
    let emb = new Discord.RichEmbed()
        .setTitle(`Ciao io sono LadyIsabel! :heart: Ho molte funzioni utili per la gilda, usa i comandi sotto indicati:`)
        .setDescription(msg)
        .setFooter(bot.conf.footer_standard);

    message.channel.send(emb);
};

exports.conf = {
    name: "Start",
    fullcmd: "start",
    alias: "start",
    description: "Il comando per iniziare ad usarmi! :stuck_out_tongue_winking_eye: ",
    timer: 3,
    tokenCost: 0,
    subClass: 'start',
    displayHelp: 1
};