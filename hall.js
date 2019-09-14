/*
*   Bot HALL9000 Discord versione 2.1
*   @Davidgalet
*   www.davidev.it
*   hall.js
*/

// Opzioni e sett
const Discord = require("discord.js");
const schedule = require('node-schedule');
const config = require("./config_hall.json");
//const model = require('./model');
const sql_data = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bot_discord_2',
  connectTimeout: 50000000
};



// Database sync-mysql
var mysqlsyn = require('sync-mysql');
var connection = new mysqlsyn(sql_data);

// Database async-mysql
// var mysqlasyn = require('mysql');
// var connection_async = mysqlasyn.createConnection(sql_data);

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

/**
 *  Avvio scheduli cron.
 *  Ogni giorno alle due di notte
 */

schedule.scheduleJob('0 2 * * *', function(){
  scriptBanUsers();
  resetCountDay();
});

setInterval(cron, 3600000 ); // 24 Ore Valore Ora 3600000
function cron(){
    log('Bot Hall Operativo');
}

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
      .addField("+help_moteration","Mostra tutti i comandi di moderazione")
      .addField("+help_settings", "Mostra tutti i comandi settings")
      .addField("+help_frasilady","Mostra tutte le impostaizoni e settaggi dei messaggi")
      .addField("+help_utility", "Mostra altri comandi di utilità")
    message.channel.send({ embed });
  }
});

/**
 **********************************************************************
 *  Blocco di moderazione help_moteration
 */
client.on("message", async message => {
  if (message.content.indexOf(config.prefix) !== 0) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === 'help_moteration') {
    var embed = new Discord.RichEmbed()
      .setAuthor('Hall9000')
      .setTitle('Sistema di gestione utenti automatizzato')
      // Set the color of the embed
      .setColor(0xFFFF)
      // Set the main content of the embed
      .setDescription('Tutti i comandi sotto stanti sono avviabili solo da un utente Admin, Moderatore, Developer o da Hall')
      .addField("+kick <@nomeutente> <scrivi il motivo>", 'Elimina un utente')
      .addField("+ban <@nomeutente> <scrivi il motivo>", 'Banna un utente')
      .addField("+purge <numero messaggi>", 'Elimina di colpo da 2 a 100 messaggi presenti in quella discussione con storico massimo di 14 giorni')
      .addField("+grave", 'Mostra gli utenti in procinto di essere eliminati')
      .addField("+addwhitelist <@nomeutente>", 'Aggiunge un utente alla lista bianca, non sarà bannato')
      .addField("+delwhitelist <@nomeutente>", 'Toglie un utente dalla lista bianca')
      .addField("+getwhitelist", 'Mostra gli utenti nella lista bianca')
      .addField("+situazione", 'Mostra in valori numerici lo stato del processo di eliminazione')
      .addField("+updatemoderator", 'Avvia il sistema di controllo moderazione utenti manualmente')
      .addField("+updatecount", 'Resetta i contatori giornalieri')
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

    if (getWhiteList(member.user.id).length > 0)
      return message.reply("Mi diapice, ma questo utente si trova in Whitelist!");

    let reason = args.slice(1).join(' ');
    if (!reason) reason = "Nessuna ragione";
    var member_id = member.id;
    connection.query("DELETE FROM users WHERE id_discord = '" + member_id + "'");
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
    var users_itg = getListStepIntoTheGrave();
    await message.channel.send("Lista utenti in procinto di essere espulsi: (Attendere fino al completamento del comdando.)");
    for (let i = 0; i < users_itg.length; i++) {
      var id_discord = users_itg[i].id_discord;
      var last_check = users_itg[i].last_check;
      var notified = users_itg[i].notified;
      if (getWhiteList(id_discord).length === 0) {
        if (notified === 1) {
          await message.channel.send("<@" + id_discord + "> - " + last_check + " **notificato**;");
        }
      }
    }
    await message.channel.send("Fine lista");
  }

  if (command === "addwhitelist") {
    if (!message.member.roles.some(r => ["Admin", "Moderatori", "Aiutante di Bordo", "Developer"].includes(r.name)))
      return message.reply("Mi dispiace, non hai i permessi per inviare questo comando");
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member)
      return message.reply("Menziona un utente presente nel server");
    insertUserWhiteList(member.user.id, member.user.tag);
    message.reply(`${member.user.tag} è stato inserito in Whitelist da ${message.author.tag}.`);
    log(`${member.user.tag} è stato inserito in Whitelist da ${message.author.tag}.`);
  }

  if (command === "delwhitelist") {
    if (!message.member.roles.some(r => ["Admin", "Moderatori", "Aiutante di Bordo", "Developer"].includes(r.name)))
      return message.reply("Mi dispiace, non hai i permessi per inviare questo comando");
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member)
      return message.reply("Menziona un utente presente nel server");
    deleteUserWhiteList(member.user.tag);
    message.reply(`utente: ${member.user.tag} è stato cancellato dalla Whitelist da ${message.author.tag}.`);
  }

  if (command === "getwhitelist") {
    if (!message.member.roles.some(r => ["Admin", "Moderatori", "Aiutante di Bordo", "Developer"].includes(r.name)))
      return message.reply("Mi dispiace, non hai i permessi per inviare questo comando");
    await message.channel.send("Processo in corso..(Attendere fino al completamento del comdando.)");
    var message_wl = "Utenti presenti nella lista bianca:\n"
    var list_white_list = whitelist();
    if (list_white_list.length > 0) {
      for (var i = list_white_list.length - 1; i >= 0; i--) {
        var id_discord_wl = list_white_list[i].id_discord;
        var n_message_wl = list_white_list[i].tag;
        await message.channel.send("Utente id: " + id_discord_wl + " // <@" + id_discord_wl + "> -- Nome tag: " + n_message_wl + " ;\n");
      }
      await message.channel.send("Completato");
    } else {
      m.edit(`La lista è vuota`);
    }
  }

  if (command === "situazione") {
    if (!message.member.roles.some(r => ["Admin", "Moderatori", "Developer"].includes(r.name)))
      return message.reply("Mi dispiace, non hai i permessi per inviare questo comando");
    const m = await message.channel.send("Attendi..");
    var users_itg = getListStepIntoTheGrave();
    var text_itg_message = "**STATO UTENTI NON ATTIVI NEL SERVER**\r";
    var n_utenti_notificati = 0;
    var n_utenti_non_notificati = 0;
    for (let i = 0; i < users_itg.length; i++) {
      var id_discord = users_itg[i].id_discord;
      var last_check = users_itg[i].last_check;
      var notified = users_itg[i].notified;
      if (getWhiteList(id_discord).length === 0) {
        if (notified === 1) {
          n_utenti_notificati += 1;
        } else {
          n_utenti_non_notificati += 1;
        }
      }
    }
    var total_list_user_grave = n_utenti_notificati + n_utenti_non_notificati;
    text_itg_message += "Utenti totali in lista nera: " + total_list_user_grave + "\n";
    text_itg_message += ":red_circle: Utenti notificati: " + n_utenti_notificati + "\n";
    text_itg_message += ":bulb: Utenti non notificati: " + n_utenti_non_notificati + "\n";
    m.edit(text_itg_message);
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
    addSettings(name, frase);
    message.channel.send('Settaggio aggiunto');
  }

  if (command === "delete_setting") {
    if (!message.member.roles.some(r => ["Developer"].includes(r.name)))
      return message.reply("Mi dispiace, ma non hai le autorizzazioni per usare questo comando.");
    var id_settings = args[0];
    delSetting(id_settings)
    message.channel.send('Settaggio eliminato');
  }

  if (command === "update_setting") {
    if (!message.member.roles.some(r => ["Admin", "Developer"].includes(r.name)))
      return message.reply("Mi dispiace, ma non hai le autorizzazioni per usare questo comando.");
    var id_settings = args[0];
    var value = args.slice(1).join(' ');
    var sett = encodeURIComponent(value)
    updSettings(id_settings, sett);
    message.channel.send('Settaggio aggiornato');
  }

  if (command === "get_setting_value") {
    if (!message.member.roles.some(r => ["Admin", "Developer"].includes(r.name)))
      return message.reply("Mi dispiace, ma non hai le autorizzazioni per usare questo comando.");
    var id_settings = args[0];
    var settings = getSettingsValue(id_settings)
    if (settings.length === 0) {
      return message.reply("Mi dispiace, ma non ci sono settaggi.");
    }
    var value = settings[0].value;
    var frase = decodeURIComponent(value);
    message.channel.send(frase);
  }

  if (command === "get_settings") {
    if (!message.member.roles.some(r => ["Admin", "Developer"].includes(r.name)))
      return message.reply("Mi dispiace, ma non hai le autorizzazioni per usare questo comando.");
    var settings = getSettings()
    if (settings.length === 0) {
      return message.reply("Mi dispiace, ma non ci sono settaggi.");
    }
    var text = ''
    for (let index = 0; index < settings.length; index++) {
      var id_settings = settings[index].id_settings;
      var name = settings[index].name;
      text += "id:"+ id_settings + " name:" + name + "\n";
    }

    var embed = new Discord.RichEmbed()
      .setTitle('Settaggio:')
      .setColor(0xFFFF)
      .addField("settings disponibili:", text)
    message.channel.send({ embed });
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
    addFrase(frase);
    message.channel.send('Frase inserita');
  }

  if(command === "getfslady") {
    if(!message.member.roles.some(r=>["Admin", "Moderatori", "Developer"].includes(r.name)) )
        return message.reply("Mi dispiace, ma non hai le autorizzazioni per usare questo comando.");
    var frasi = getFrasi()
    if (frasi.length === 0 ) {
        return message.reply("Mi dispiace, ma non ci sono frasi.");
    }
    for (let index = 0; index < frasi.length; index++) {
      var id_message = frasi[index].id_message;
      var frase = frasi[index].message;
      frase = unescape(frase);
      var status = frasi[index].status;
      if ( status === 0 ) {
        var embed = new Discord.RichEmbed()
        .setTitle('Frasi di servizio')
        .setColor(0xFFFF)
        .addField("Id Frase:",id_message)
        .addField("Frase:", frase)
        .addField("Stato:", 'Non attivo')
        message.channel.send({embed});
      } else {
        var embed = new Discord.RichEmbed()
        .setTitle('Frasi di servizio')
        .setColor(0xFFFF)
        .addField("Id Frase:",id_message)
        .addField("Frase:", frase)
        .addField("Stato:", 'attivo')
        message.channel.send({embed});
      }
    }
  }

  if(command === "delfslady") {
    if(!message.member.roles.some(r=>["Admin", "Moderatori", "Developer"].includes(r.name)) )
        return message.reply("Mi dispiace, ma non hai le autorizzazioni per usare questo comando.");
    var id_messaggio = args.join(" ");
    delFrase(id_messaggio);
    message.channel.send('Frase di servizio eliminata');
  }

  if(command === "stafslady") {
    if(!message.member.roles.some(r=>["Admin", "Moderatori", "Developer"].includes(r.name)) )
        return message.reply("Mi dispiace, ma non hai le autorizzazioni per usare questo comando.");
    var id_messaggio = args[0];
    var status = args.slice(1).join(' ');
    if (status === 'attivo') {
      cangeStatusFrase(id_messaggio,1);
    } else {
      cangeStatusFrase(id_messaggio,0);
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
      .addField("+userdata", '**Solo Developer** Mostra i dati completi del utente')
      .addField("+situazione", 'Mostra in valori numerici lo stato del processo di eliminazione')
      .addField("+updatemoderator", 'Avvia il sistema di controllo moderazione utenti manualmente')
      .addField("+updatecount", 'Resetta i contatori giornalieri')
      .addField("+say <messaggio>", 'Questo è un comando magico..Solo lo staff ne conosce i segreti')
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

  if (command === "userdata") {
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    console.log(member);
  }

  if (command === "situazione") {
    if (!message.member.roles.some(r => ["Admin", "Moderatori", "Developer"].includes(r.name)))
      return message.reply("Mi dispiace, non hai i permessi per inviare questo comando");
    const m = await message.channel.send("Attendi..");
    var users_itg = getListStepIntoTheGrave();
    var text_itg_message = "**STATO UTENTI NON ATTIVI NEL SERVER**\r";
    var n_utenti_notificati = 0;
    var n_utenti_non_notificati = 0;
    for (let i = 0; i < users_itg.length; i++) {
      var id_discord = users_itg[i].id_discord;
      var last_check = users_itg[i].last_check;
      var notified = users_itg[i].notified;
      if (getWhiteList(id_discord).length === 0) {
        if (notified === 1) {
          n_utenti_notificati += 1;
        } else {
          n_utenti_non_notificati += 1;
        }
      }
    }
    var total_list_user_grave = n_utenti_notificati + n_utenti_non_notificati;
    text_itg_message += "Utenti totali in lista nera: " + total_list_user_grave + "\n";
    text_itg_message += ":red_circle: Utenti notificati: " + n_utenti_notificati + "\n";
    text_itg_message += ":bulb: Utenti non notificati: " + n_utenti_non_notificati + "\n";
    m.edit(text_itg_message);
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
    resetBotMention();
    message.channel.send('Menzioni resettati');
  }

  if (command === "raid") {
    if (!message.member.roles.some(r => ["Admin", "Moderatori", "Developer", "Aiutante di Bordo"].includes(r.name)))
      return message.reply("Mi dispiace, ma non hai le autorizzazioni per usare questo comando.");
    var espulsioni_array = deadUsers();
    if (espulsioni_array.length > 0) {
      for (var i = espulsioni_array.length - 1; i >= 0; i--) {
        var espulsioni_array_id_discord = espulsioni_array[i].id_discord;
        if (getWhiteList(espulsioni_array_id_discord).length === 0) {
          var embed = new Discord.RichEmbed()
            .setAuthor(`Ciao sono uno dei bot della Gilda La flotta Nerd, questo messaggio è generato automaticamente, quindi non rispondere, in quanto il mio creatore non lo leggerebbe.`)
            .setTitle('Purtroppo mi è toccato espellerti..')
            .setColor(0xFF8000)
            .setDescription("Mi dispiace ma sei stato espulso dalla gilda La Flotta Nerd poiché non sei stato attivo per più di 16 giorni mostrando non interesse.")
            .setFooter("Un arrivederci dallo staff La flotta Nerd se ci ripensi sai come contattarci.")
          client.users.get(espulsioni_array_id_discord).send({ embed });
          log('Invio messaggio del motivo della espulsione utente <@' + espulsioni_array_id_discord + '>');
          client.channels.get(config.channel_home).send('+kick <@' + espulsioni_array_id_discord + '> Espulsione per non attività');
          log('Invio comando di espulsione ad <@' + espulsioni_array_id_discord + '>');
        }
      }
    }
  }
}); //Fine messaggi.

/**
 * 
 * Funzioni
 * 
 */

function log(note){
  var embed = new Discord.RichEmbed()
  .setTitle('-- LOG --')
  .setColor(0xFFFF)
  .setDescription(note)
  client.channels.get(config.channel_log).send({embed});
}

/**
 * Tool per il ban degli utenti se non attivi.
 */
function scriptBanUsers(){
  //Porta a zero i valori negativi messaggi o preseze
  var getUsersData = getsUsers();
  for (var i = getUsersData.length - 1; i >= 0; i--) {
      var id_discord_getUsers = getUsersData[i].id_discord;
      var n_message_getUsers = getUsersData[i].messages;
      if (n_message_getUsers < 0) {
        setZeroMessage(id_discord_getUsers);
      }
      var n_message_presentes = getUsersData[i].presences;
      if (n_message_presentes < 0) {
      	setZeroPresence(id_discord_getUsers);
      }
  }
  log('Corretti i valori minori di 0 nel DB');
  //Controlla se gli utenti hanno una attività 0 avvia il timer
  var guilds = client.guilds.array();
  for (let i = 0; i < guilds.length; i++) {
    client.guilds.get(guilds[i].id).fetchMembers().then(r => {
      r.members.array().forEach(r => {
        let id_discord = r.user.id;
        //Controlla se è presente in lista bianca
        if(getWhiteList(id_discord).length === 0 ){
          //Evita il bot 1 di Discord
          if (id_discord > 1 && id_discord !== config.bot_id_1 && id_discord !== config.bot_id_2 && id_discord !== config.bot_id_3 && id_discord !== config.bot_id_4) {
            var info_user = users(id_discord);
            if (info_user.length > 0) {
              var presences = info_user[0].presences;
              var last_check = info_user[0].last_check;
              if (presences == 0) {
                //Controlla l'ultimo check se non settato lo setta!
                if (last_check == null) {
                  //Aggiungi la data del check
                  userLastCheck(id_discord);
                } 
              } else {
                //Resetta il clock
                if (last_check !== null) {
                  resetLastCheck(id_discord);
                }
              }
            }
          }
        }
      });
    });
  }
  log('Ciclo controllo utenti non attivi completato');
  //Ciclo Gestione avvisi se passati 6 giorni
  var avvisi_array = notifiedUsers();
  if (avvisi_array.length > 0 ) {
    for (var i = avvisi_array.length - 1; i >= 0; i--) {
      var notified = avvisi_array[i].notified;
      var notified_id_discord = avvisi_array[i].id_discord;
      var last_check = avvisi_array[i].last_check;
      if (notified == 0) {
        if (last_check !== null) {
          if(getWhiteList(notified_id_discord).length === 0 ){
            client.users.get(notified_id_discord).send(config.meg_pban);
            userSetNitified(notified_id_discord);
            userLastCheck(notified_id_discord);
            log('Avviso di non attività inviato');
          }
        }
      }
    }
  }
  //Ciclo Espulsioni se passati 10 giorni dagli avvisi
  var espulsioni_array = deadUsers();
  if (espulsioni_array.length > 0 ) {
    for (var i = espulsioni_array.length - 1; i >= 0; i--) {
      var espulsioni_array_id_discord = espulsioni_array[i].id_discord;
      if(getWhiteList(espulsioni_array_id_discord).length === 0 ){
        var guild = client.guilds.get("532184361068527646");
        var member = guild.members.get(espulsioni_array_id_discord);
        member.kick().then((member) => {
          console.log(`Kicked ${member.displayName}`);
          log('Invio comando di espulsione ad <@'+espulsioni_array_id_discord+'>');
        }).catch(console.error);
      }
    }
  }
}



/**
 * Resetta e sottrae i punti giornalieri.
 */
function resetCountDay(){
  var getUsersData = getsUsers();
  //Togliere i punti o le presenze
  for (var i = getUsersData.length - 1; i >= 0; i--) {
    var id_discord = getUsersData[i].id_discord;
    var messages = getUsersData[i].messages;
    var messages_day = getUsersData[i].messages_day;

    if (messages_day == 0){
        if (messages > 0) {
            if (messages <= 100) {
                removeMessage(id_discord,5);
            } else {
                removeMessage(id_discord,10);
            }
        }
    }

    var presences = getUsersData[i].presences;
    var presence_day = getUsersData[i].presence_day;
    
    if (presence_day == 0){
      if (presences > 0) {
          if (presences <= 100) {
              removePresence(id_discord,5);
          } else {
              removePresence(id_discord,10);
          }
      }
    }
  }
  //Resetta il contatore messaggi
  resetPesenceCount();

  //Porta a zero i valori negativi
  for (var i = getUsersData.length - 1; i >= 0; i--) {
    var id_discord_getUsers = getUsersData[i].id_discord;
  	var n_message_getUsers = getUsersData[i].messages;
  	if (n_message_getUsers < 0) {
  		setZeroMessage(id_discord_getUsers);
  	}
  	var n_message_presentes = getUsersData[i].presences;
  	if (n_message_presentes < 0) {
  		setZeroPresence(id_discord_getUsers);
  	}
  }
  log('Reset ponti e attività giornlaliero completato');
}

/**
 * Eventi registrati.
 * Aggiunge il punto presenza e i punti messaggi. Se l'utente non inserito nel database lo aggiunge.
 */

client.on('raw', event => {
  //console.log('\nRaw event data:\n', event);
  if (event.t === 'PRESENCE_UPDATE') {
    var user_id_discod = event.d.user.id;
    if (event.d.guild_id == '532184361068527646' && event.d.status == 'online') {
      if(user_id_discod !== config.bot_id_1 && user_id_discod !== config.bot_id_2 && user_id_discod !== config.bot_id_3 && user_id_discod !== config.bot_id_4){
        //Controlla se l'utente è presente nel database
        var users = getUser(user_id_discod);
        if (users.length > 0) {
          addPointPresenceDayUpdate(user_id_discod);
        } else {
          addUser(user_id_discod);
          addPointPresenceDayUpdate(user_id_discod);
        }
      }
    }
  }
  if (event.t === 'MESSAGE_CREATE') {
    var user_id_discod = event.d.author.id;
    if (event.d.guild_id == '532184361068527646') {
      if(user_id_discod !== config.bot_id_1 && user_id_discod !== config.bot_id_2 && user_id_discod !== config.bot_id_3 && user_id_discod !== config.bot_id_4){
        //Controlla se l'utente è presente nel database
        var users = getUser(user_id_discod);
        if (users.length > 0) {
          var id_discord = users.map(a => a.id_discord);
          addPointMessageUser(id_discord);
          addPointPresenceDayMessage(user_id_discod);
        } else {
          addUser(user_id_discod);
          addPointMessageUser(user_id_discod);
          addPointPresenceDayMessage(user_id_discod);
        }
      }
    }
  }
  if (event.t === 'MESSAGE_REACTION_ADD') {
    var user_id_discod = event.d.user_id;
    if (event.d.guild_id == '532184361068527646') {
      if(user_id_discod !== config.bot_id_1 && user_id_discod !== config.bot_id_2 && user_id_discod !== config.bot_id_3 && user_id_discod !== config.bot_id_4){
        //Controlla se l'utente è presente nel database
        var users = getUser(user_id_discod);
        if (users.length > 0) {
          addPointPresenceDayReaction(user_id_discod);
        } else {
          addUser(user_id_discod);
          addPointPresenceDayReaction(user_id_discod);
        }
      }
    }
  }
});

/**
 * Model Estrazione dati
 */

// Model
function getSettings(){
  var result = connection.query("SELECT * FROM settings");
  return result;
}

function getSettingsValue(id_settings) {
  var result = connection.query("SELECT * FROM settings WHERE id_settings = '" + id_settings + "'");
  return result;
}

function delSetting(id_settings){
  connection.query("DELETE FROM settings WHERE id_settings = '" + id_settings + "'");
}

function addSettings(name,value){
  connection.query("INSERT INTO settings( name ,  value ) VALUES ('" + name + "','" + value + "')");
}

function updSettings(id_settings, value){
  connection.query("UPDATE settings SET value = '"+ value +"' WHERE id_settings = '"+ id_settings +"'");
}

function getsUsers(){
  var result = connection.query("SELECT * FROM users");
  return result;
}

function users(id_discord){
  var result = connection.query("SELECT * FROM users WHERE id_discord = '"+ id_discord +"'");
  return result;
}

function addUser(id_discord){
  connection.query("INSERT INTO users (id_discord, messages) VALUES ('"+ id_discord +"', 0)");
}

function deadUsers(){
  var result = connection.query("SELECT * FROM users WHERE last_check < (NOW() - INTERVAL 15 DAY) AND notified = 1");
  return result;
}

function notifiedUsers(){
  var result = connection.query("SELECT * FROM users WHERE last_check < (NOW() - INTERVAL 15 DAY) AND notified = 0 AND presences = 0");
  return result;
}

function userSetNitified(id_discord){
  var result = connection.query("UPDATE users SET notified = 1 WHERE id_discord = '"+ id_discord +"'");
  return result;
}

function userLastCheck(id_discord){
  var result = connection.query("UPDATE users SET last_check = NOW() WHERE id_discord = '"+ id_discord +"'");
  return result;
}

function resetLastCheck(id_discord){
  var result = connection.query("UPDATE users SET last_check = NULL , notified = 0 WHERE id_discord = '"+ id_discord +"'");
  return result;
}

function setZeroMessage(id_discord){
  connection.query("UPDATE users SET messages = 0 WHERE id_discord = '"+ id_discord +"'");
}

function setZeroPresence(id_discord){
  connection.query("UPDATE users SET presences = 0 WHERE id_discord = '"+ id_discord +"'");
}

function getWhiteList(id_discord){
  var result = connection.query("SELECT * FROM white_list WHERE id_discord = '"+ id_discord +"'");
  return result;
}

function whitelist(){
  var result = connection.query("SELECT * FROM white_list");
  return result;
}

function insertUserWhiteList(id_discord,tag){
  connection.query("INSERT INTO white_list (id_discord , tag) VALUES ('"+ id_discord +"','"+ tag +"')");
}

function deleteUserWhiteList(tag){
  connection.query("DELETE FROM white_list WHERE tag = '" + tag + "'");
}

function getListStepIntoTheGrave(){
  var result = connection.query("SELECT * FROM users  WHERE NOT last_check = '' ");
  return result;
}

function removeMessage(id_discord,message){
  connection.query("UPDATE users SET messages = messages - "+ message +" WHERE id_discord = '"+ id_discord +"'");
}

function removePresence(id_discord,point){
  connection.query("UPDATE users SET presences = presences - "+ point +" WHERE id_discord = '"+ id_discord +"'");
}

function resetPesenceCount(){
  connection.query("UPDATE users SET messages_day = 0 , presence_day = 0 , bot_mention = 0");
}

function resetBotMention(){
  connection.query("UPDATE users SET bot_mention = 0");
}

function getFrasi(){
  var result = connection.query("SELECT * FROM messages ");
  return result;
}

function addFrase(frase){
  connection.query("INSERT INTO messages ( message ) VALUES ('"+ frase +"')");
}

function delFrase(id_phrase){
  connection.query("DELETE FROM messages WHERE id_message = '" + id_phrase + "'");
}

function cangeStatusFrase(id_phrase,status){
  connection.query("UPDATE messages SET status = "+status+" WHERE id_message = '"+ id_phrase +"'");
}

function getUser(id_discord){
  var result = connection.query("SELECT * FROM users WHERE id_discord = '" + id_discord + "'");
  return result;
}

function addPointMessageUser(id_discord){
  connection.query("UPDATE users SET messages = messages + 1 , messages_day = messages_day + 1 WHERE id_discord = '"+ id_discord +"'");
}

function addPointPresenceDayUpdate(id_discord){
  connection.query("UPDATE users SET presence_day = presence_day + 1 , presences = presences + 1 , presence_update = presence_update + 1 WHERE id_discord = '"+ id_discord +"'");
}

function addPointPresenceDayMessage(id_discord){
  connection.query("UPDATE users SET presence_day = presence_day + 1 , presences = presences + 1 , presence_message = presence_message + 1 WHERE id_discord = '"+ id_discord +"'");
}

function addPointPresenceDayReaction(id_discord){
  connection.query("UPDATE users SET presence_day = presence_day + 1 , presences = presences + 1 , presence_reaction = presence_reaction + 1 WHERE id_discord = '"+ id_discord +"'");
}

client.login(config.token);