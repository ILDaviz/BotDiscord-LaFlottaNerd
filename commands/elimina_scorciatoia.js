let cmds = require('../helpers/loadcommands').cmdDetail;
let Discord = require('discord.js');
let botModel = require('../helpers/Models');

exports.run = async (message, bot) => {

    const args = message.content.slice(bot.conf.prefix.length).trim().split(/ +/g);
    const id_sc = args[1]

    if (!message.member.roles.some(r => ["Admin", "Developer","Moderatori"].includes(r.name)))
        return message.reply("Mi dispiace, ma non hai le autorizzazioni per usare questo comando.");
    if (!id_sc) {
        return message.reply("Devi indicarmi un riferimento id della scorciatoia");
    }
    botModel.selectSettingFromId(id_sc, function(err,res){
        if (err) {
            return message.reply("Errore questo riferimento non esiste");
        }

        for (let i = 0; i < res.length; i++) {
            if (res[i].type == 'scorciatoia') {
                botModel.deleteSetting(id_sc, function (err, res) {
                    if (err) {
                        return message.reply("Errore di aggiornamento" + err);
                    }
                    return message.reply("Riferimento cancellato con successo");
                });
            } else {
                return message.reply("Errore stai tentando di eliminare un elemento non scorciatoia controlla se l'id è corretto");
            }
            
        }
    })
};

exports.conf = {
    name: "Elimina_scorciatoia",
    fullcmd: "elimina_scorciatoia",
    alias: "delsc",
    description: "{id scorciatoia} Elimina una scorciatoia.",
    timer: 0,
    tokenCost: 0,
    subClass: 'scorciatoie',
    displayHelp: 1
};