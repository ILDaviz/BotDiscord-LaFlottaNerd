let cmds = require('../../helpers/loadcommands').cmdDetail;
let Discord = require('discord.js');
let botModel = require('../../helpers/Models');

exports.run = async (message, bot) => {

    const args = message.content.slice(bot.conf.prefix.length).trim().split(/ +/g);
    const id_scorciatoia = args.slice(1).join(' ');

    if (!message.member.roles.some(r => ["Admin", "Moderatori", "Developer"].includes(r.name)))
        return message.reply("Mi dispiace, ma non hai le autorizzazioni per usare questo comando.");
    
    message.delete().catch(O_o => { });
    botModel.selectSettingFromId(id_scorciatoia ,function (err,res) {
        if (err) {
            return message.channel.send('errore sql di estrazione');
        }

        if (res[0].type != 'scorciatoia') {
            return message.channel.send('Stai tentando di stampare un riferimento diverso da "scorciatoia"');
        }

        let message_value = res[0].value;
        message.channel.send(unescape(message_value));
    })
};

exports.conf = {
    name: "Stampa_scorciatoia",
    fullcmd: "stampa_scorciatoia",
    alias: "stsc",
    description: "{id scorciatoia} Stampa la scorciatoia direttamente nella pagina dove viene scritto il comando",
    timer: 0,
    tokenCost: 0,
    subClass: 'scorciatoie',
    displayHelp: 1
};