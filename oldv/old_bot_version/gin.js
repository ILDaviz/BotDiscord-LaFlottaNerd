/*
*   Bot Bifrost per Discord versione 1.0
*   @Davidgalet
*   www.davidev.it
*   gin.js
*
*/

// Opzioni e sett
const Discord = require("discord.js");
const schedule = require('node-schedule');
const config = require("./config_gin.json.js");
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
    client.user.setActivity(`W il Gin!`);
});

client.on('error', (err) => {
    console.log(err.message)
 });

var coll = false;

setInterval(cron, 600000 ); // 24 Ore Valore Ora 3600000
function cron(){
    console.log('avvio pulizia');
    const list = client.guilds.get("532184361068527646"); 
    list.members.forEach(member => mementon(member.user.id,member.presence.status)); 
}

setInterval(cron_1, 3600000 ); // 24 Ore Valore Ora 3600000
function cron_1(){
    log('Bot Gin Operativo -- Sistema di controllo bot Offline');
}

function mementon(id,status){
    if (id === config.hall900) {
        if (status === 'offline' ) {
            client.users.get(config.dev_1).send('Attenzione, il bot <@'+id+'> è **OFFLINE**');
            client.users.get(config.dev_2).send('Attenzione, il bot <@'+id+'> è **OFFLINE**');
        }
    }

    if (id === config.ladyisa) {
         if (status === 'offline' ) {
            client.users.get(config.dev_1).send('Attenzione, il bot <@'+id+'> è **OFFLINE**');
            client.users.get(config.dev_2).send('Attenzione, il bot <@'+id+'> è **OFFLINE**');
        }
    }

    if (id === config.bifrost) {
         if (status === 'offline' ) {
            client.users.get(config.dev_1).send('Attenzione, il bot <@'+id+'> è **OFFLINE**');
            client.users.get(config.dev_2).send('Attenzione, il bot <@'+id+'> è **OFFLINE**');
        }
    }

    if (id === config.Yuki) {
         if (status === 'offline' ) {
            client.users.get(config.dev_1).send('Attenzione, il bot <@'+id+'> è **OFFLINE**');
            client.users.get(config.dev_2).send('Attenzione, il bot <@'+id+'> è **OFFLINE**');
        }
    }
}


function log(note){
    var embed = new Discord.RichEmbed()
    .setTitle('-- LOG --')
    .setColor(0xFFFF)
    .setDescription(note)
    client.channels.get(config.channel_log).send({embed});
}

client.login(config.token);
