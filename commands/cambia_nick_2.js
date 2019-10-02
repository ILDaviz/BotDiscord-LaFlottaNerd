let cmds = require('../helpers/loadcommands').cmdDetail;
let Discord = require('discord.js');

exports.run = async (message, bot) => {
    
    const args = message.content.slice(bot.conf.prefix.length).trim().split(/ +/g);
    const args_1 = args.slice(1).join(' ');
    const args_2 = args.slice(2).join(' ');

    if (!message.guild.me.hasPermission('MANAGE_NICKNAMES')) 
        return message.channel.send('In questa chat non è consentito cambiare il nickname o non ne hai i permessi');
    if (!message.guild.me.hasPermission('CHANGE_NICKNAME'))
        return message.channel.send('Purtroppo non posso cambiare il tuo soprannome');
    if (!args_1)
        return message.channel.send('Non hai scritto nessun sopranomme. Ti ricordo che è formato dal tuonickpsn(tuo nome vero) tra parentesi');
    
    message.member.setNickname(args_1).then((log) => {
        return message.channel.send('Fatto!');
        }).catch((log) => {
        return message.channel.send('Non ha funzinoato, hai un ruolo più alto del mio.. :tired_face: ');
        });
};

exports.conf = {
    name: "Nuovo_nick",
    fullcmd: "nuovonick",
    alias: "nick",
    description: "Cambia il soprannome in questa gilda, ci penso io a tutto!",
    timer: 0,
    tokenCost: 0,
    subClass: 'start',
    displayHelp: 0
};