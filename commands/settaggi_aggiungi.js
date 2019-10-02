const Discord  = require('discord.js');
const botModel = require('../helpers/Models');
const botUtili = require('../helpers/Util');
const botCache = require('../helpers/Cache');

exports.run = async (message, bot) => {
  
    const args = message.content.slice(bot.conf.prefix.length).trim().split(/ +/g);
    const args_1 = args.slice(1).join(' ');
    const args_2 = args.slice(1).join(' ');
    const args_3 = args.slice(1).join(' ');

    if (!message.member.roles.some(r => ["Admin", "Developer"].includes(r.name)))
      return message.reply("Mi dispiace, ma non hai le autorizzazioni per usare questo comando.");
    let frase = encodeURIComponent(args_3);
    botModel.insertSetting(args_1, args_2, frase, function (err, res) { });
    message.channel.send('Settaggio aggiunto');
};

exports.conf = {
    name: "Aggiungi_settaggio",
    fullcmd: "aggiungi_settaggio",
    alias: "addsett",
    description: "[tipo] [nome] [valore] Aggiungi un nuovo settaggio nel database. Tipo e nome non devono contenere spazzi ma solo il simbolo _ . I tipi disponibili sono: settings,text,role,service_message. Non usare altri tipi. Il nome è il riferimento deve essere univoco.",
    timer: 0,
    tokenCost: 0,
    subClass: 'help_settaggi',
    displayHelp: 1
};