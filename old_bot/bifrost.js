/*
*   Bot Bifrost per Discord versione 2.0
*   @Davidgalet
*   www.davidev.it
*   bifrost.js
*
*/

// Opzioni e sett
const Discord = require("discord.js");
const schedule = require('node-schedule');
const config = require("./config_bifrost.json");
const reactions = "👍";
const sql_data = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bot_discord_2'
};

// Database sync-mysql
var MySql = require('sync-mysql');
var connection = new MySql(sql_data);

// Database async-mysql
var mysql = require('mysql');
var connection_async = mysql.createConnection(sql_data);

// Avvio del bot Hall
const client = new Discord.Client();

client.on("ready", () => {
    console.log(`Bot ON.`);
    client.user.setActivity(`God of War`);
});

setInterval(cron, 3600000 ); // 24 Ore Valore Ora 3600000
function cron(){
    log('Bot Bifrost Online');
}

client.on('error', (err) => {
    console.log(err.message)
 });

client.on("message", async message => {
    if(message.content.indexOf(config.prefix) !== 0) return;
      const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
      const command = args.shift().toLowerCase();

    if(command === 'help') {
        var embed = new Discord.RichEmbed()
        .setAuthor('Bifrost')
        .setTitle('Sistema di gestione ruoli')
        .setColor(0xFFF0)
        .setDescription('Tutti i comandi sotto stanti sono avviabili solo da un utente Admin, Moderatore, Developer')
        .addField("&create", 'Questo comando stampa i selettori di ruolo')
        .addField("&purge <numero messaggi>", 'Elimina di colpo da 2 a 100 messaggi presenti in quella discussione con storico massimo di 14 giorni')
        .addField("&addrole <nome esatto>", 'Aggiunge un ruolo (Deve essere identico al ruolo impostato nei Settings)')
        .addField("&getroles", 'Mostra i ruoli')
        .addField("&delrole <id_settings>", 'Elimina un ruolo')
        .addField("&settitle <title>",'Setta il titolo (il vecchio viene riscritto)')
        .addField("&setsubtitle <subtitle>",'Setta la frase per categoria (il vecchio viene riscritto)')
        .setFooter('Quando scrivi un comadno non serve scrivere i siboli < e > servono solo a farti capire come strutturare il comando')
        message.channel.send({embed});
    }

    if(command === "purge") {

        if(!message.member.roles.some(r=>["Admin", "Moderatori", "Developer"].includes(r.name)) )
          return message.reply("Mi dispiace, non hai i permessi per inviare questo comando");

        const deleteCount = parseInt(args[0], 10);
        
        if(!deleteCount || deleteCount < 2 || deleteCount > 100)
          return message.reply("Per piacere inserisci il numero di messaggi da cancellare da 2 a 1000");
        
        // So we get our messages, and delete them. Simple enough, right?
        const fetched = await message.channel.fetchMessages({limit: deleteCount});
        message.channel.bulkDelete(fetched)
          .catch(error => message.reply(`Non è stato possibile eliminare i messaggi perché: ${error}`));
    }


    if(command === "create") {
        if(!message.member.roles.some(r=>["Admin", "Moderatori", "Developer"].includes(r.name)) )
            return message.reply("Mi dispiace, non hai i permessi per inviare questo comando");
        var toSend = generateMessages();
        let mappedArray = [[toSend[0], false], ...toSend.slice(1).map( (message, idx) => [message, reactions])];
        for (let mapObj of mappedArray){
            message.channel.send(mapObj[0]).then( sent => {
                if (mapObj[1]){
                    sent.react(mapObj[1]);  
                } 
            });
        }
    }

    if(command === "addrole") {
        if(!message.member.roles.some(r=>["Admin", "Moderatori", "Developer"].includes(r.name)) )
        return message.reply("Mi dispiace, non hai i permessi per inviare questo comando");
        var role = args.join(" ");
        addSettings('role',role);
        message.reply("Ruolo aggiunto");
    }

    if(command === "getroles") {
        if(!message.member.roles.some(r=>["Admin", "Moderatori", "Developer"].includes(r.name)) )
        return message.reply("Mi dispiace, non hai i permessi per inviare questo comando");
        var roles = getSetting('role');
        if (roles.length >= 1) {
            var embed = new Discord.RichEmbed();
            embed.setTitle('Ruoli');
            for (let index = 0; index < roles.length; index++) {
                const element = roles[index].value;
                const id_settings = roles[index].id_settings;
                embed.addField("ID = "+ id_settings, element)
            }
            message.reply(embed);
        } else {
            message.reply("Mi dispiace non ci sono ruoli");
        }
    }

    if(command === "delrole") {
        if(!message.member.roles.some(r=>["Admin", "Moderatori", "Developer"].includes(r.name)) )
        return message.reply("Mi dispiace, non hai i permessi per inviare questo comando");
        var id_settings = args.join(" ");
        delSetting(id_settings);
    }

    if(command === "settitle") {
        if(!message.member.roles.some(r=>["Admin", "Moderatori", "Developer"].includes(r.name)) )
        return message.reply("Mi dispiace, non hai i permessi per inviare questo comando");
        
        var var_tit = getSetting('role_title');
        var title = escape(args.join(" "));
        console.log(title);
        console.log(var_tit.length);
        if (var_tit.length > 0 ) {
            updSettings('role_title', title);
        } else {
            addSettings('role_title', title);
        }
        message.reply("Titolo Aggiornato");
    }

    if(command === "setsubtitle") {
        if(!message.member.roles.some(r=>["Admin", "Moderatori", "Developer"].includes(r.name)) )
        return message.reply("Mi dispiace, non hai i permessi per inviare questo comando");

        var var_subtit = getSetting('role_subtitle');
        var subtitle = escape(args.join(" "));
        if (var_subtit.length > 0 ) {
            updSettings('role_subtitle', subtitle);
        } else {
            addSettings('role_subtitle', subtitle);
        }
        message.reply("SubTitolo Aggiornato");
    }
})

/**
 * 
 * Funzioni
 * 
 */

function generateMessages(){
    var messages = [];
    initialMessage = getSettingValue('role_title');
    subMessage = getSettingValue('role_subtitle');
    
    if (initialMessage.length > 0) {
        role_title = unescape(initialMessage[0].value);
    } else {
        role_title = 'Titolo non settato';
    }

    if (subMessage.length > 0) {
        role_subtitle = unescape(subMessage[0].value);
    } else {
        role_subtitle = 'Sottotitoli non settati';
    }

    messages.push(role_title);

    role = getSettingValue('role');

    if (role.length > 0) {
        for (var i = role.length - 1; i >= 0; i--) {
            value = role[i].value;
            messages.push(`"${role_subtitle}": **"${value}"**!`);
        }
    } else {
        messages.push(`"${role_subtitle}": ** Nessun ruolo inserito **!`);
    }

    return messages;
}

function log(note){
    var embed = new Discord.RichEmbed()
    .setTitle('-- LOG --')
    .setColor(0xFFFF)
    .setDescription(note)
    client.channels.get(config.channel_log).send({embed});
}

/**
 * 
 *  Gestione Click nell'argomento per gestire i ruoli
 * 
 */

client.on('raw', event => {
    if (event.t === 'MESSAGE_REACTION_ADD' || event.t == "MESSAGE_REACTION_REMOVE"){
        if (event.d.channel_id === config.channel_set_rule) {
            let channel = client.channels.get(event.d.channel_id);
            let message = channel.fetchMessage(event.d.message_id).then(msg=> {
            let user = msg.guild.members.get(event.d.user_id);
            initialMessage = getSettingValue('role_title');
            if (initialMessage.length > 0) {
                role_title = unescape(initialMessage[0].value);
            } else {
                role_title = 'Titolo non settato';
            }
            if (msg.author.id == client.user.id && msg.content != role_title){
           
                var re = `\\*\\*"(.+)?(?="\\*\\*)`;
                var role = msg.content.match(re)[1];
            
                if (user.id != client.user.id){
                    var roleObj = msg.guild.roles.find(r => r.name === role);
                    var memberObj = msg.guild.members.get(user.id);
                    
                    if (event.t === "MESSAGE_REACTION_ADD"){
                        memberObj.addRole(roleObj)
                        log('Utente <@'+user.id+'> è **entrato** nel canale: '+roleObj);
                    } else {
                        memberObj.removeRole(roleObj);
                        log('Utente <@'+user.id+'> è **uscito** dal canale: '+roleObj);
                    }
                }
            }
            })
        }
    }   
});

/**
 * 
 * Model Estrazione dati
 * 
 */

function getSettings(){
    const result = connection.query("SELECT * FROM settings");
    return result;
}

function getSetting(name){
    const result = connection.query("SELECT * FROM settings WHERE name = '" + name + "'");
    return result;
}

function getSettingValue(name){
    const result = connection.query("SELECT value FROM settings WHERE name = '" + name + "'");
    return result;
}

function addSettings(name,value){
    connection.query("INSERT INTO `settings` (`id_settings`, `name`, `value`, `description`) VALUES (NULL,'"+name+"','"+value+"', '');");
}

function updSettings(name, value){
    connection.query("UPDATE settings SET value = '"+ value +"' WHERE name = '"+ name +"'");
}

function delSetting(id_settings){
    connection.query("DELETE FROM settings WHERE id_settings = '" + id_settings + "'");
}

client.login(config.token);
