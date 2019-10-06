let cmds = require('../helpers/loadcommands').cmdDetail;
let Discord = require('discord.js');
let botModel = require('../helpers/Models');

exports.run = async (message, bot) => {

    const args = message.content.slice(bot.conf.prefix.length).trim().split(/ +/g);
    const id_sc = args[1]
    const args_3 = args.slice(2).join(' ');

    if (!message.member.roles.some(r => ["Admin", "Developer","Moderatori"].includes(r.name)))
        return message.reply("Mi dispiace, ma non hai le autorizzazioni per usare questo comando.");
    if (!id_sc) {
        return message.reply("Devi indicarmi un riferimento id della scorciatoia");
    }
    if (!args_3) {
        return message.reply("Devi scrivermi un testo");
    }
    botModel.selectSettingFromId(id_sc, function(err,res){
        if (err) {
            return message.reply("Errore questo riferimento non esiste");
        }
        if (res[0].type == 'scorciatoia') {
            botModel.updateSetting(id_sc,args_3,function(err,res){
                if (err) {
                    return message.reply("Errore di aggiornamento" + err );
                }
            });
        } else {
            return message.reply("Errore stai tentando di modificare un elemento non scorciatoia controlla se l'id è corretto");
        }
    })
};

exports.conf = {
    name: "Aggiorna_scorciatoia",
    fullcmd: "aggiorna_scorciatoia",
    alias: "agsc",
    description: "{id scorciatoia} {testo} Aggiorna il valore di una scorciatoia.",
    timer: 0,
    tokenCost: 0,
    subClass: 'scorciatoie',
    displayHelp: 1
};