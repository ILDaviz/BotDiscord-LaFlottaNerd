let cmds = require('../helpers/loadcommands').cmdDetail;
let Discord = require('discord.js');

exports.run = async (message, bot) => {
    
    const args = message.content.slice(bot.conf.prefix.length).trim().split(/ +/g);
    const args_1 = args.slice(1).join(' ');

    if (!message.guild.me.hasPermission('MANAGE_NICKNAMES')) 
        return message.channel.send('In questa chat non è consentito cambiare il nickname o non ne hai i permessi');
    if (!message.guild.me.hasPermission('CHANGE_NICKNAME'))
        return message.channel.send('Purtroppo non posso cambiare il tuo nickname');
    if (!args_1)
        return message.channel.send('Non hai scritto nessun nickname. Ti ricordo che è formato dal tuonickpsn(tuo nome vero) tra parentesi');
    
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
    description: "{nuovo soprannome} Crea un soprannome composto in questo modo: prima scrivi il tuo ID-PSN, seguito dal nome reale (non quello in-game) tra parentesi, ad esempio: Cicciogamer88 (Davide), in modo da riconoscerci facilmente durante le sessioni di gioco.",
    timer: 0,
    tokenCost: 0,
    subClass: 'start',
    displayHelp: 1
};