'user strict';

const bot = require('../bot.js');
const botUtil = require('../helpers/util');
const Discord = require('discord.js');
const estractor = require("../helpers/json");

bot.on('message', (message) => {
    if (message.author.bot) return;
    let d = checkPresence('trigger_mhw_a', message.content);
    let e = checkPresence('trigger_mhw_b', message.content);
    if (message.channel.name == "mhw") {
        if (d == true) {
            if (e == true) {
                botUtil.log('Trigger attivato tipo dove trovare l\'id di gioco monster hunter dall\'utente: <@' + message.author.id + '>','BD10E0');
                let emb = new Discord.RichEmbed()
                    .setTitle(`Ti do un suggerimento cacciatore! :loudspeaker: `)
                    .setColor('RANDOM')
                    .setDescription(estractor.getText('suggerimento_idmhw'));
                message.channel.send(emb);
            }
        }
    }
});

/**
 * Questa funzione serve a gestire la presenza di un determinato elemento.
 */
checkPresence = function (name_trigger, str) {
    //Preparazione della stringa
    let strra = str.replace(/[^a-zA-Z ]/g, "");
    strtlc = strra.toLowerCase()
    let str_split = strtlc.trim().split(/ +/g);
    //Presenza elemento == 0 inizialmente
    var p = 0;
    //Estrazione trigger.
    let trigger_str = estractor.getSetting(name_trigger);
    let trigger_array = trigger_str.split(','); //Array trigger
    //Buffer della stringa
    var buf_str = Buffer.from(strtlc);
    //Controllo presenza
    trigger_array.forEach(element => {
       let presence = buf_str.includes(element);
       if (presence) {
           //Aggiunta presenza
           p = p + 1;
       }
    });

    if (p == 0) {
        return false;
    } else {
        return true;
    }
}