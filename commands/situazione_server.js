const Discord  = require('discord.js');
const botModel = require('../helpers/Models');
const botUtili = require('../helpers/Util');
const botCache = require('../helpers/Cache');

exports.run = async (message, bot) => {
    if (!message.member.roles.some(r => ["Admin", "Moderatori", "Developer"].includes(r.name)))
      return message.reply("Mi dispiace, non hai i permessi per inviare questo comando");
    const m = await message.channel.send("Attendi..");
    botModel.selectUsersInToGrave(function(err, res){
      if (err) {
        return message.channel.send('errore_text' + err);
      }
      if (res.length > 0) {
        let text_itg_message = "**STATO UTENTI NON ATTIVI NEL SERVER**\r";
        let n_utenti_notificati = 0;
        let n_utenti_non_notificati = 0;
        for (let i = 0; i < res.length; i++) {
          let notified = res[i].notified;
          if (notified === 1) {
            n_utenti_notificati += 1;
          } else {
            n_utenti_non_notificati += 1;
          }
        }
        let total_list_user_grave = n_utenti_notificati + n_utenti_non_notificati;
        text_itg_message += "Utenti totali in lista nera: " + total_list_user_grave + "\n";
        text_itg_message += ":red_circle: Utenti notificati: " + n_utenti_notificati + "\n";
        text_itg_message += ":bulb: Utenti non notificati: " + n_utenti_non_notificati + "\n";
        m.edit(text_itg_message);
      } else {
        m.edit("la lista è vuota..");
      }
    });
};

exports.conf = {
    name: "Situazione_server",
    fullcmd: "situazione_server",
    alias: "sitser",
    description: "Mostra lo stato del server con dei dati informativi come n° utenti o altro",
    timer: 0,
    tokenCost: 0,
    subClass: 'utility_staff',
    displayHelp: 1
};