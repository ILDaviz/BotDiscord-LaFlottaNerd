/*
*   Bot HALL9000 Discord versione 2.1
*   @Davidgalet
*   www.davidev.it
*   hall.js
*/

// Opzioni e sett
var Discord = require("discord.js");
var schedule = require('node-schedule');
var config = require("./config/config_hall.json");
var botModel = require('./model/botModel');

// Avvio del bot Hall
const client = new Discord.Client();
client.on("ready", () => {
  console.log(`Bot Hall9000 online`); 
  client.user.setActivity(`ILDikozzo è brutto`);
});
// Stamapa errori
client.on('error', (err) => {
  console.log(err.message)
});

schedule.scheduleJob('0 2 * * *', function () {
  scriptBanUsers();
  resetCountDay();
});

/**
 **********************************************************************
 *  Help generico
 */
client.on("message", async message => {
  if (message.content.indexOf(config.prefix) !== 0) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === 'help') {
    var embed = new Discord.RichEmbed()
      .setAuthor('Hall9000')
      .setTitle('Sistema di gestione utenti automatizzato')
      .setDescription('Tutti i comandi sotto stanti sono dei sotto gruppi entra in uno di questi per avere maggiori dettagli')
      .setColor(0xFFFF)
      .addField("+help_moderation","Mostra tutti i comandi di moderazione")
      .addField("+help_settings", "Mostra tutti i comandi settings")
      .addField("+help_frasilady","Mostra tutte le impostaizoni e settaggi dei messaggi")
      .addField("+help_utility", "Mostra altri comandi di utilità")
    message.channel.send({ embed });
  }
});

/**
 **********************************************************************
 *  Blocco di moderazione help_moderation
 */
client.on("message", async message => {
  if (message.content.indexOf(config.prefix) !== 0) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === 'help_moderation') {
    var embed = new Discord.RichEmbed()
      .setAuthor('Hall9000')
      .setTitle('Sistema di gestione utenti automatizzato')
      .setColor(0xFFFF)
      .setDescription('Tutti i comandi sotto stanti sono avviabili solo da un utente Admin, Moderatore, Developer o da Hall')
      .addField("+kick <@nomeutente> <scrivi il motivo>", 'Elimina un utente')
      .addField("+ban <@nomeutente> <scrivi il motivo>", 'Banna un utente')
      .addField("+purge <numero messaggi>", 'Elimina di colpo da 2 a 100 messaggi presenti in quella discussione con storico massimo di 14 giorni')
      .addField("+grave", 'Mostra gli utenti in procinto di essere eliminati')
      .addField("+addwhitelist <@nomeutente>", 'Aggiunge un utente alla lista bianca, non sarà bannato')
      .addField("+delwhitelist <@nomeutente>", 'Toglie un utente dalla lista bianca')
      .addField("+getwhitelist", 'Mostra gli utenti nella lista bianca')
      .addField("+situazione", 'Mostra in valori numerici lo stato del processo di eliminazione')
      .addField("+updatemoderator","Avvia il processo di moderazione manualmente")
      .addField("+updatecount","Resetta il contatore manualmente")
      .addField("+cleendatabase", "Elimina manualmente gli utenti non più esistendi da discord nel database")
      .setFooter('Quando scrivi un comadno non serve scrivere i siboli < e > servono solo a farti capire come strutturare il comando')
    message.channel.send({ embed });
  }

  if (command === "kick") {
    if (!message.member.roles.some(r => ["Admin", "Moderatori", "Aiutante di Bordo", "Developer"].includes(r.name)))
      return message.reply("Mi dispiace, non hai i permessi per inviare questo comando");
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member)
      return message.reply("Per piacere menziona un utente presente nel server");
    if (!member.kickable)
      return message.reply("Purtroppo non posso espellerlo! Ha un ruolo più alto? Hai il permesso di espellere?");

    botModel.selectUserWhiteList(member.user.id , function (err, res) {
      if (res.length > 0) {
        return message.reply("Mi diapice, ma questo utente si trova in Whitelist!");
      }
    });
  
    let reason = args.slice(1).join(' ');
    if (!reason) reason = "Nessuna ragione";
    var member_id = member.id;
    botModel.deleteUser(member_id, function(err,res){ });
    await member.kick(reason)
      .catch(error => message.reply(`Mi dispiace ${message.author} non ho potuto espellerlo perché : ${error}`));
    message.reply(`${member.user.tag} utente espulso da ${message.author.tag} perché: ${reason}`);
    log(`${member.user.tag} utente espulso da ${message.author.tag} perché: ${reason}`);
  }

  if (command === "ban") {
    if (!message.member.roles.some(r => ["Admin", "Moderatori", "Aiutante di Bordo", "Developer"].includes(r.name)))
      return message.reply("Mi dispiace, non hai i permessi per inviare questo comando");

    let member = message.mentions.members.first();
    if (!member)
      return message.reply("Per piacere menziona un utente presente nel server");
    if (!member.bannable)
      return message.reply("Purtroppo non posso bannarlo! Hai il permesso di bannare gli utenti?");

    let reason = args.slice(1).join(' ');
    if (!reason) reason = "Nessuna ragione";

    await member.ban(reason)
      .catch(error => message.reply(`Mi dispiace ${message.author} non è stato possibile bannarlo perché: ${error}`));
    message.reply(`${member.user.tag} è stato bannato da ${message.author.tag} perché: ${reason}`);
    log(`${member.user.tag} è stato bannato da ${message.author.tag} perché: ${reason}`);
  }

  if (command === "purge") {

    if (!message.member.roles.some(r => ["Admin", "Moderatori", "Developer"].includes(r.name)))
      return message.reply("Mi dispiace, non hai i permessi per inviare questo comando");

    const deleteCount = parseInt(args[0], 10);

    if (!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Per piacere inserisci il numero di messaggi da cancellare da 2 a 1000");

    // So we get our messages, and delete them. Simple enough, right?
    const fetched = await message.channel.fetchMessages({ limit: deleteCount });
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Non è stato possibile eliminare i messaggi perché: ${error}`));
  }

  if (command === "grave") {
    if (!message.member.roles.some(r => ["Admin", "Moderatori", "Developer"].includes(r.name)))
      return message.reply("Mi dispiace, non hai i permessi per inviare questo comando");
    message.channel.send("Lista utenti in procinto di essere espulsi: (Attendere fino al completamento del comdando.)");
    botModel.selectUsersInToGrave(function(err,res){
      for (let i = 0; i < res.length; i++) {
        const id_discord = res[i].id_discord;
        const last_check = res[i].last_check;
        const notified = res[i].notified;
        botModel.selectUserWhiteList(id_discord, function(err, res){
          if (res.length === 0) {
            if (notified === 1) {
              message.channel.send("<@" + id_discord + "> - " + last_check + " **notificato**;");
            }
          }
        });
      }
    });
    await message.channel.send("Fine lista");
  }

  if (command === "addwhitelist") {
    if (!message.member.roles.some(r => ["Admin", "Moderatori", "Aiutante di Bordo", "Developer"].includes(r.name)))
      return message.reply("Mi dispiace, non hai i permessi per inviare questo comando");
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member)
      return message.reply("Menziona un utente presente nel server");
    botModel.insertUserWhiteList(member.user.id, member.user.tag, function(err, res){ });
    message.reply(`${member.user.tag} è stato inserito in Whitelist da ${message.author.tag}.`);
    log(`${member.user.tag} è stato inserito in Whitelist da ${message.author.tag}.`);
  }

  if (command === "delwhitelist") {
    if (!message.member.roles.some(r => ["Admin", "Moderatori", "Aiutante di Bordo", "Developer"].includes(r.name)))
      return message.reply("Mi dispiace, non hai i permessi per inviare questo comando");
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member)
      return message.reply("Menziona un utente presente nel server");
    botModel.deleteUserwhiteList(member.user.tag, function(err,res){ });
    message.reply(`utente: ${member.user.tag} è stato cancellato dalla Whitelist da ${message.author.tag}.`);
  }

  if (command === "getwhitelist") {
    if (!message.member.roles.some(r => ["Admin", "Moderatori", "Aiutante di Bordo", "Developer"].includes(r.name)))
      return message.reply("Mi dispiace, non hai i permessi per inviare questo comando");
    message.channel.send("Processo in corso..(Attendere fino al completamento del comdando.)");
    botModel.selectUserWhiteList(function(err,res){
      if (res.length > 0) {
        for (var i = res.length - 1; i >= 0; i--) {
          var id_discord_wl = res[i].id_discord;
          var n_message_wl = res[i].tag;
          message.channel.send("Utente id: " + id_discord_wl + " // <@" + id_discord_wl + "> -- Nome tag: " + n_message_wl + " ;\n");
        }
        message.channel.send("Comando completato");
      } else {
        message.channel.send("Non ci utenti nella lista bianca");
      }
    });
  }

  if (command === "situazione") {
    if (!message.member.roles.some(r => ["Admin", "Moderatori", "Developer"].includes(r.name)))
      return message.reply("Mi dispiace, non hai i permessi per inviare questo comando");
    const m = await message.channel.send("Attendi..");
    botModel.selectUsersInToGrave(function(err, res){
      if (res.length > 0) {
        var text_itg_message = "**STATO UTENTI NON ATTIVI NEL SERVER**\r";
        var n_utenti_notificati = 0;
        var n_utenti_non_notificati = 0;
        for (let i = 0; i < res.length; i++) {
          var notified = res[i].notified;
          if (notified === 1) {
            n_utenti_notificati += 1;
          } else {
            n_utenti_non_notificati += 1;
          }
        }
        var total_list_user_grave = n_utenti_notificati + n_utenti_non_notificati;
        text_itg_message += "Utenti totali in lista nera: " + total_list_user_grave + "\n";
        text_itg_message += ":red_circle: Utenti notificati: " + n_utenti_notificati + "\n";
        text_itg_message += ":bulb: Utenti non notificati: " + n_utenti_non_notificati + "\n";
        m.edit(text_itg_message);
      } else {
        m.edit("la lista è vuota..");
      }
    });
  }

  if (command === "updatemoderator") {
    if (!message.member.roles.some(r => ["Admin", "Moderatori", "Developer"].includes(r.name)))
      return message.reply("Mi dispiace, non hai i permessi per inviare questo comando");
    const m = await message.channel.send("Attendi..");
    scriptBanUsers();
    m.edit("Processo completato.");
    log('Aggiornamento moderazione avviato manualmente utente <@' + message.author.id + '>');
  }

  if (command === "updatecount") {
    if (!message.member.roles.some(r => ["Admin", "Moderatori", "Developer"].includes(r.name)))
      return message.reply("Mi dispiace, non hai i permessi per inviare questo comando");
    const m = await message.channel.send("Attendi..");
    resetCountDay();
    m.edit("Processo completato.");
    log('Reset contatori giornalieri avviato manualmente utente <@' + message.author.id + '>');
  }

  if (command === "cleendatabase") {
    if (!message.member.roles.some(r => ["Admin", "Moderatori", "Developer"].includes(r.name)))
      return message.reply("Mi dispiace, non hai i permessi per inviare questo comando");
    const m = await message.channel.send("Attendi..");
    cleenDatabase();
    m.edit("Processo completato.");
    log('Database pulito dall\' utente: <@' + message.author.id + '>');
  }
});

/**
 **********************************************************************
 *  Blocco di settaggio help_setting
 */
client.on("message", async message => {
  if (message.content.indexOf(config.prefix) !== 0) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === 'help_settings') {
    var embed = new Discord.RichEmbed()
      .setAuthor('Hall9000')
      .setTitle('Sistema di gestione utenti automatizzato')
      // Set the color of the embed
      .setColor(0xFFFF)
      // Set the main content of the embed
      .setDescription('Tutti i comandi sotto stanti sono avviabili solo da un utente Admin, Moderatore, Developer o da Hall')
      .addField("+get_settings", 'Stampa tutti i settings')
      .addField("+get_setting_value <id settings>", "Mostra il contenuto di un settaggio")
      .addField("+add_setting <nome> <valore>", 'Aggiunge un settaggio')
      .addField("+delete_setting <id settings>", 'Elimina una settaggio')
      .addField("+update_setting <id settings> <nuovo valore>", 'Aggiorna un valore di un settaggio')
      .setFooter('Quando scrivi un comadno non serve scrivere i siboli < e > servono solo a farti capire come strutturare il comando')
    message.channel.send({ embed });
  }

  if (command === "add_setting") {
    if (!message.member.roles.some(r => ["Admin", "Developer"].includes(r.name)))
      return message.reply("Mi dispiace, ma non hai le autorizzazioni per usare questo comando.");
    var name = args[0];
    var value = args.slice(1).join(' ');
    var frase = encodeURIComponent(value);
    botModel.insertSetting(name, frase, function (err, res) { });
    message.channel.send('Settaggio aggiunto');
  }

  if (command === "delete_setting") {
    if (!message.member.roles.some(r => ["Developer"].includes(r.name)))
      return message.reply("Mi dispiace, ma non hai le autorizzazioni per usare questo comando.");
    var id_setting = args[0];
    botModel.deleteSetting(id_setting, function (err, res) { });
    message.channel.send('Settaggio eliminato');
  }

  if (command === "update_setting") {
    if (!message.member.roles.some(r => ["Admin", "Developer"].includes(r.name)))
      return message.reply("Mi dispiace, ma non hai le autorizzazioni per usare questo comando.");
    var id_setting = args[0];
    var value = args.slice(1).join(' ');
    var sett = encodeURIComponent(value)
    botModel.updateSetting(id_setting, sett, function (err, res) { });
    message.channel.send('Settaggio aggiornato');
  }

  if (command === "get_setting_value") {
    if (!message.member.roles.some(r => ["Admin", "Developer"].includes(r.name)))
      return message.reply("Mi dispiace, ma non hai le autorizzazioni per usare questo comando.");
    var id_setting = args[0];
    botModel.selectSettingValue(id_setting, function (err, res) {
      if (res.length === 0) {
        return message.reply("Mi dispiace, ma non ci sono settaggi.");
      }

      var value = res[0].value;
      var frase = decodeURIComponent(value);
      message.channel.send(frase);

    });
  }

  if (command === "get_settings") {
    if (!message.member.roles.some(r => ["Admin", "Developer"].includes(r.name)))
      return message.reply("Mi dispiace, ma non hai le autorizzazioni per usare questo comando.");
    botModel.selectSettings(function (err, res) {
      if (res.length === 0) {
        return message.reply("Mi dispiace, ma non ci sono settaggi.");
      }
        var text = ''
      for (let index = 0; index < res.length; index++) {
        var id_settings = res[index].id_settings;
        var name = res[index].name;
          text += "id:" + id_settings + " name:" + name + "\n";
        }

        var embed = new Discord.RichEmbed()
          .setTitle('Settaggio:')
          .setColor(0xFFFF)
          .addField("settings disponibili:", text)
        message.channel.send({ embed });

    });
  }
});

/**
 **********************************************************************
 *  Blocco di settaggio messaggi lady help_frasilady
 */
client.on("message", async message => {
  if(message.content.indexOf(config.prefix) !== 0) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  if (command === 'help_frasilady') {
    var embed = new Discord.RichEmbed()
    .setAuthor('Hall9000')
    .setTitle('Sistema di gestione utenti automatizzato')
    // Set the color of the embed
    .setColor(0xFFFF)
    // Set the main content of the embed
    .setDescription('Tutti i comandi sotto stanti sono avviabili solo da un utente Admin, Moderatore, Developer o da Hall')
    .addField("+addfslady <frase>", 'Aggiungi una frase di servizio a LadyIsabel')
    .addField("+getfslady", 'Lista frasi di servizio LadyIsabel')
    .addField("+delfslady <id frase>", 'Elimina una frase di servizio')
    .addField("+stafslady <id frase> <stato (attivo o nonattivo)>", 'Elimina una frase')
    .setFooter('Quando scrivi un comadno non serve scrivere i siboli < e > servono solo a farti capire come strutturare il comando')
    message.channel.send({embed});
  }

  if(command === "addfslady") {
    if(!message.member.roles.some(r=>["Admin", "Moderatori", "Developer"].includes(r.name)) )
        return message.reply("Mi dispiace, ma non hai le autorizzazioni per usare questo comando.");
    var frase = escape(args.join(" "));
    botModel.insertMessageLadyisabel(frase, function (err, res) { });
    message.channel.send('Frase inserita');
  }

  if(command === "getfslady") {
    if(!message.member.roles.some(r=>["Admin", "Moderatori", "Developer"].includes(r.name)) )
        return message.reply("Mi dispiace, ma non hai le autorizzazioni per usare questo comando.");
    botModel.selectMessageLadyisabel(function(err,res){
      if (res.length === 0 ) {
        return message.reply("Mi dispiace, ma non ci sono frasi.");
      }

      for (let index = 0; index < res.length; index++) {
        var id_message = res[index].id_message;
        var frase = res[index].message;
        frase = unescape(frase);
        var status = res[index].status;
        if (status === 0) {
          var embed = new Discord.RichEmbed()
            .setTitle('Frasi di servizio')
            .setColor(0xFFFF)
            .addField("Id Frase:", id_message)
            .addField("Frase:", frase)
            .addField("Stato:", 'Non attivo')
          message.channel.send({ embed });
        } else {
          var embed = new Discord.RichEmbed()
            .setTitle('Frasi di servizio')
            .setColor(0xFFFF)
            .addField("Id Frase:", id_message)
            .addField("Frase:", frase)
            .addField("Stato:", 'attivo')
          message.channel.send({ embed });
        }
      }
    });
  }

  if(command === "delfslady") {
    if(!message.member.roles.some(r=>["Admin", "Moderatori", "Developer"].includes(r.name)) )
        return message.reply("Mi dispiace, ma non hai le autorizzazioni per usare questo comando.");
    var id_messaggio = args.join(" ");
    botModel.deleteMessageLadyisabel(id_messaggio, function (err, res) { });
    message.channel.send('Frase di servizio eliminata');
  }

  if(command === "stafslady") {
    if(!message.member.roles.some(r=>["Admin", "Moderatori", "Developer"].includes(r.name)) )
        return message.reply("Mi dispiace, ma non hai le autorizzazioni per usare questo comando.");
    var id_messaggio = args[0];
    var status = args.slice(1).join(' ');
    if (status === 'attivo') {
      botModel.updateStatusMessageLadyisabel(id_messaggio, 1, function (err, res) { });
    } else {
      botModel.updateStatusMessageLadyisabel(id_messaggio, 0, function (err, res) { });
    }
    message.channel.send('Stato frase di servizio aggiornato');
  }
});

/**
 **********************************************************************
 *  Blocco di settaggio messaggi lady help_utility
 */
client.on("message", async message => {
  if (message.content.indexOf(config.prefix) !== 0) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === 'help_utility') {
    var embed = new Discord.RichEmbed()
      .setAuthor('Hall9000')
      .setTitle('Sistema di gestione utenti automatizzato')
      // Set the color of the embed
      .setColor(0xFFFF)
      // Set the main content of the embed
      .setDescription('Tutti i comandi sotto stanti sono avviabili solo da un utente Admin, Moderatore, Developer o da Hall')
      .addField("+ping", 'Questo comando mostra i tempi di risposta del server')
      .addField("+raid", "Forza il sistema di espulsione")
      .addField("+inrole <ruolo>", 'Mostra gli utenti presenti in un canale, specificare il ruolo')
      .addField("+say <messaggio>", 'Questo è un comando magico..Solo lo staff ne conosce i segreti')
      .addField("+resetmention", "Questo comando resetta le menzioni del bot")
      .setFooter('Quando scrivi un comadno non serve scrivere i siboli < e > servono solo a farti capire come strutturare il comando')
    message.channel.send({ embed });
  }

  if (command === "ping") {
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latenza server ${m.createdTimestamp - message.createdTimestamp}ms. Latenza API ${Math.round(client.ping)}ms`);
  }

  if (command === "inrole") {
    if (!message.member.roles.some(r => ["Admin", "Moderatori", "Aiutante di Bordo", "Developer"].includes(r.name)))
      return message.reply("Mi dispiace, non hai i permessi per inviare questo comando");
    let roleName = message.content.split(" ").slice(1).join(" ");
    let membersWithRole = message.guild.members.filter(member => {
      return member.roles.find(x => x.name === roleName);
    }).map(member => {
      return member.user.username;
    });
    var numbers_user = 0;
    for (var i = membersWithRole.length - 1; i >= 0; i--) {
      numbers_user = numbers_user + 1;
    }
    let embed = new Discord.RichEmbed({
      "title": `Utenti nell ruolo: ${roleName}`,
      "description": membersWithRole.join("; "),
      "color": 0xFFFF
    }).addField("Numero utenti", numbers_user);
    return message.channel.send({ embed });
  }

  if (command === "say") {
    if (!message.member.roles.some(r => ["Admin", "Moderatori", "Developer"].includes(r.name)))
      return message.reply("Mi dispiace, ma non hai le autorizzazioni per usare questo comando.");
    const sayMessage = args.join(" ");
    message.delete().catch(O_o => { });
    message.channel.send(sayMessage);
    log('Scrive un messagio nelle spoglie di Hall - utente <@' + message.author.id + '>');
  }

  if (command === "resetmention") {
    if (!message.member.roles.some(r => ["Admin", "Developer"].includes(r.name)))
      return message.reply("Mi dispiace, ma non hai le autorizzazioni per usare questo comando.");
    botModel.updateResetBotMention(function (err, res) { });
    message.channel.send('Menzioni resettati');
  }

  if (command === "raid") {
    if (!message.member.roles.some(r => ["Admin", "Moderatori", "Developer", "Aiutante di Bordo"].includes(r.name)))
      return message.reply("Mi dispiace, ma non hai le autorizzazioni per usare questo comando.");
    botModel.selectDeadUsers(function (err, res) {
      if (res.length > 0) {
        for (var i = res.length - 1; i >= 0; i--) {
          const id_discord = res[i].id_discord;
          botModel.selectUserWhiteList(id_discord, function (err, res) {
            if (res.length === 0) {
              console.log('fuori');
              var guild = client.guilds.get("532184361068527646");
              var member = guild.members.get(id_discord);
              member.kick().then((member) => {
              }).catch(console.log(error));
            }
          });
        }
      }
    });
    message.channel.send('Processo completato');
  }
}); //Fine messaggi.

/**
 * Crea un log che stamperà su discord
 * @param { string } note 
 */
function log(note){
  var embed = new Discord.RichEmbed()
  .setTitle('-- LOG --')
  .setColor(0xFFFF)
  .setDescription(note)
  client.channels.get(config.channel_log).send({embed});
}
/**
 * Pulisce gli utenti che non sono più presenti dal database su discord
 */
function cleenDatabase() {
  botModel.selectUsers(function(err,res){
    for (let i = 0; i < res.length; i++) {
      const id_discord = res[i].id_discord;
      let guild = client.guilds.get('532184361068527646');
      if (!guild.member(id_discord)) {
        console.log('no_presnet');
        botModel.deleteUser(id_discord, function (err, res) { });
      }
    }
  });
}
/**
 * Porta a zero i contatori negativi
 */
function zeroValoriNegativi() {
  botModel.selectUsers(function (err, res) {
    for (var i = res.length - 1; i >= 0; i--) {
      var id_discord = res[i].id_discord;
      var n_message_getUsers = res[i].messages;
      if (n_message_getUsers < 0) {
        botModel.updateZeroMessage(id_discord, function (err, res) { });
        botModel.updateZeroPresence(id_discord, function (err, res) { });
      }
      var n_message_presentes = res[i].presences;
      if (n_message_presentes < 0) {
        botModel.updateZeroPresence(id_discord, function (err, res) { });
      }
    }
  });
}
/**
 * Controlla se gli utenti hanno una attività 0 avvia il timer
 */
function aggiuntaTimerDiNonAttivita() {
  var guilds = client.guilds.array();
  for (let i = 0; i < guilds.length; i++) {
    client.guilds.get(guilds[i].id).fetchMembers().then(r => {
      r.members.array().forEach(r => {
        const id_discord = r.user.id;
        //Controlla se è presente in lista bianca
        botModel.selectUserWhiteList(id_discord, function (err, res) {
          if (res.length === 0) {
            //Evita il bot 1 di Discord
            if (id_discord > 1 && id_discord !== config.bot_id_1 && id_discord !== config.bot_id_2 && id_discord !== config.bot_id_3 && id_discord !== config.bot_id_4) {
              botModel.selectUser(id_discord, function (err, res) {
                if (res.length > 0) {
                  var presences = res[0].presences;
                  var last_check = res[0].last_check;
                  if (presences == 0) {
                    //Controlla l'ultimo check se non settato lo setta!
                    if (last_check == null) {
                      //Aggiungi la data del check
                      botModel.updateUserLastCheck(id_discord, function (err, res) { });
                    }
                  } else {
                    //Resetta il clock
                    if (last_check !== null) {
                      botModel.updateUserLastCheck(id_discord, function (err, res) { });
                    }
                  }
                }
              });
            }
          }
        });
      });
    });
  }
}
/**
 * Ciclo Gestione avvisi se passati 6 giorni
 */
function passaggioSeiGiorniPostConteggio() {
  botModel.selectNotifiedUsers(function (err, res) {
    if (res.length > 0) {
      for (var i = res.length - 1; i >= 0; i--) {
        var notified = res[i].notified;
        const id_discord = res[i].id_discord;
        var last_check = res[i].last_check;
        if (notified == 0) {
          if (last_check !== null) {
            botModel.selectUserWhiteList(id_discord, function (err, res) {
              if (res.length === 0) {
                client.users.get(id_discord).send(config.meg_pban);
                botModel.updateUserNotified(id_discord, function (err, res) { });
                botModel.updateUserLastCheck(id_discord, function (err, res) { });
              }
            });
          }
        }
      }
    }
  });
}
/**
 * Ciclo di espulsione
 */
function cicloDiEspulsione() {
  botModel.selectDeadUsers(function (err, res) {
    if (res.length > 0) {
      for (var i = res.length - 1; i >= 0; i--) {
        const id_discord = res[i].id_discord;
        botModel.selectUserWhiteList(id_discord, function (err, res) {
          if (res.length === 0) {
            var guild = client.guilds.get("532184361068527646");
            var member = guild.members.get(id_discord);
            member.kick().then((member) => {
            }).catch(console.log(error));
          }
        });
      }
    }
  });
}
/**
 * Tool per il ban degli utenti se non attivi.
 */
function scriptBanUsers() {
  log("Processo di ban start");
  zeroValoriNegativi();
  aggiuntaTimerDiNonAttivita();
  passaggioSeiGiorniPostConteggio();
  cicloDiEspulsione();
  log("Processo di ban end");
}
/**
 * Resetta e sottrae i punti giornalieri.
 */
function resetCountDay() {
  botModel.selectUsers(function(err,res){
    //Togliere i punti o le presenze
    for (var i = res.length - 1; i >= 0; i--) {

      var id_discord = res[i].id_discord;
      var messages = res[i].messages;
      var messages_day = res[i].messages_day;

      if (messages_day == 0) {
        if (messages > 0) {
          if (messages <= 100) {
            botModel.updateRemoveMessageUser(id_discord, 5, function (err, res) { });
          } else {
            botModel.updateRemoveMessageUser(id_discord, 10, function (err, res) { });
          }
        }
      }

      var presences = res[i].presences;
      var presence_day = res[i].presence_day;

      if (presence_day == 0) {
        if (presences > 0) {
          if (presences <= 100) {
            botModel.updateRemovePointUser(id_discord, 5, function (err, res) { });
          } else {
            botModel.updateRemovePointUser(id_discord, 10, function (err, res) { });
          }
        }
      }
    }

    botModel.updateResetPresenceCount(function(err,res){ });

    for (var i = res.length - 1; i >= 0; i--) {
      var id_discord_getUsers = res[i].id_discord;
      var n_message_getUsers = res[i].messages;
      if (n_message_getUsers < 0) {
        botModel.updateZeroMessage(id_discord_getUsers, function (err, res) { });
      }
      var n_message_presentes = res[i].presences;
      if (n_message_presentes < 0) {
        botModel.updateZeroPresence(id_discord_getUsers, function (err, res) { });
      }
    }
  });
}

/**************************************************************************************************
 * Eventi registrati.
 **************************************************************************************************
 * Aggiunge il punto presenza e i punti messaggi. Se l'utente non inserito nel database lo aggiunge.
 */
client.on('raw', event => {
  //console.log('\nRaw event data:\n', event);
  if (event.t === 'PRESENCE_UPDATE') {
    var user_id_discod = event.d.user.id;
    if (event.d.guild_id == '532184361068527646' && event.d.status == 'online') {
      if(user_id_discod !== config.bot_id_1 && user_id_discod !== config.bot_id_2 && user_id_discod !== config.bot_id_3 && user_id_discod !== config.bot_id_4){
        //Controlla se l'utente è presente nel database
        botModel.selectUser(user_id_discod,function(err,res){
          if (res.length > 0) {
            botModel.updatePointPresenceDayUpdate(user_id_discod, function (err, res) { });
          } else {
            botModel.insertUser(user_id_discod, function (err, res) { });
            botModel.updatePointPresenceDayUpdate(user_id_discod, function (err, res) { });
          }
        });
      }
    }
  }
  if (event.t === 'MESSAGE_CREATE') {
    var user_id_discod = event.d.author.id;
    if (event.d.guild_id == '532184361068527646') {
      if(user_id_discod !== config.bot_id_1 && user_id_discod !== config.bot_id_2 && user_id_discod !== config.bot_id_3 && user_id_discod !== config.bot_id_4){
        //Controlla se l'utente è presente nel database
        botModel.selectUser(user_id_discod, function (err, res) {
          if (res.length > 0) {
            botModel.updatePointMessageUser(user_id_discod,function(err,res) {});
            botModel.updatePointPresenceDayMessage(user_id_discod, function (err, res) { });
          } else {
            botModel.insertUser(user_id_discod, function (err, res) { });
            botModel.updatePointMessageUser(user_id_discod, function (err, res) { });
            botModel.updatePointPresenceDayMessage(user_id_discod, function (err, res) { });
          }
        });
      }
    }
  }
  if (event.t === 'MESSAGE_REACTION_ADD') {
    var user_id_discod = event.d.user_id;
    if (event.d.guild_id == '532184361068527646') {
      if(user_id_discod !== config.bot_id_1 && user_id_discod !== config.bot_id_2 && user_id_discod !== config.bot_id_3 && user_id_discod !== config.bot_id_4){
        //Controlla se l'utente è presente nel database
        botModel.selectUser(user_id_discod, function (err, res) {
          if (res.length > 0) {
            botModel.updatePointPresenceDayReaction(user_id_discod, function (err, res) { });
          } else {
            botModel.insertUser(user_id_discod, function (err, res) { });
            botModel.updatePointPresenceDayReaction(user_id_discod, function (err, res) { });
          }
        });
      }
    }
  }
});

client.login(config.token);