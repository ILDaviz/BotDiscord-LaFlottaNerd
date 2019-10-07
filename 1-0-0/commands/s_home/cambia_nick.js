let cmds = require('../../helpers/loadcommands').cmdDetail;
let Discord = require('discord.js');

exports.run = async (message, bot) => {
    
    const args = message.content.slice(bot.conf.prefix.length).trim().split(/ +/g);
    const args_1 = args.slice(1).join(' ');

    if (!message.guild.me.hasPermission('MANAGE_NICKNAMES')) 
        return message.channel.send('In questa chat non è consentito cambiare il nickname o non ne hai i permessi');
    if (!message.guild.me.hasPermission('CHANGE_NICKNAME'))
        return message.channel.send('Purtroppo non posso cambiare il tuo nickname');
    if (!args_1)
        return message.channel.send('Hai digitato male il comando, ti ricordo che devi scrivere !Cambia_nick seguito dal tuo ID-PSN + il nome reale tra parentesi, esempio: !Cambia_nick Cicciogamer88 (Davide)');
    
    message.member.setNickname(args_1).then((log) => {
        return message.channel.send('Soprannome modificato, dal prossimo messaggio sarà visibile!');
        }).catch((log) => {
        return message.channel.send('Non ha funzinoato, hai un ruolo più alto del mio.. :tired_face: ');
        });
};

exports.conf = {
    name: "Cambia_nick",
    fullcmd: "cambia_nick",
    alias: "cnick",
    description: "Comando per modificare il proprio nickname, scrivilo in chat inserendo di seguito il tuo ID-PSN + il nome reale tra parentesi, esempio: !Cambia_nick Cicciogamer88 (Davide)",
    timer: 0,
    tokenCost: 0,
    subClass: 'start',
    displayHelp: 1
};