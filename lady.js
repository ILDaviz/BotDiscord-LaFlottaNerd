/*
*   Bot LadyIsabel per Discord versione 2.4
*   @Davidgalet
*   www.davidev.it
*   lady.js
*
*/

// Opzioni e sett
const Discord = require("discord.js");
const schedule = require('node-schedule');
const config = require("./config_lady.json");
const sql_data = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bot_discord_2'
};

// Database sync-mysql
var MySql = require('sync-mysql');
var connection = new MySql(sql_data);

// Avvio del bot LadyIsabel
const client = new Discord.Client();

client.on("ready", () => {
    console.log(`Bot Ladyisabel online.`); 
    client.user.setActivity(`Doki Doki literature club`);
});
// Stampa errori
client.on('error', (err) => {
    console.log(err.message);
});

/**
 *  Avvio scheduli cron.
 */

schedule.scheduleJob('0 9 * * *', function(){
    getServiceMessage();
});

schedule.scheduleJob('0 13 * * *', function(){
    getServiceMessage();
});


schedule.scheduleJob('0 17 * * *', function(){
    getServiceMessage();
});

schedule.scheduleJob('0 21 * * *', function(){
    getServiceMessage();
});

//Avvio check integrità in log
setInterval(cron, 3600000 ); // Ora 3600000
function cron(){
    log('Bot Lady Operativo');
}

// Crea un evento se l'utente entra nella gilda.
client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.find(ch => ch.name === 'welcome');
    var users_list_1 = usersList(member.id);
    if (users_list_1.length = 0) {
    addUser(member.id);
    }
    if (!channel) return;
    var embed = new Discord.RichEmbed()
    .setAuthor(`Benvenuto nel server Discord de LA FLOTTA NERD!`)
    .setTitle(getSetting('isabel_welcome_title_message'))
    .setColor(0xFF8000)
    .setDescription('Ciao' + member + ',' + getSetting('isabel_welcome_message'))
    .setFooter(getSetting('isabel_footer_message_standard'))
    channel.send({embed});
});

// Crea se un utente se ne va.
client.on('guildMemberRemove', member => {
    const channel = member.guild.channels.find(ch => ch.name === 'welcome');
    var users_list_2 = usersList(member.id);
    if (users_list_2.length > 0) {
        deleteUser(member.id);
    }
    if (!channel) return;
    channel.send(`No Perché!!! L'utente ${member} ha lasciato il server..:sob:`);
});

/**
 * 
 * Avvio controllo Messaggi
 * 
 */

client.on("message", async message => {

    //Se l'utente ha superato un determinato livello.
    asyncCall(message.author.id, message.channel.id);

    //Che non sia il bot
    if(message.author.bot) return;

    // if (message.member.nickname) {
    //     if (message.member.nickname.indexOf("(") === -1 && message.member.nickname.indexOf(")" === -1 )) {
    //         var id_user_nickname = message.member.id;
    //         var embed = new Discord.RichEmbed()
    //         .setAuthor(getSetting('isabel_head_message_standard'))
    //         .setTitle('Purtroppo il tuo soprannome non è scritto correttamente per questa Gilda.')
    //         .setColor(0xFF8000)
    //         .setDescription(getSetting('isabel_message_nickname'))
    //         .setFooter(getSetting('isabel_footer_message_standard'))
    //         client.users.get(id_user_nickname).send({embed});
    //     }
    // } else {
    //     var user_name = message.member.user.username;
    //     if (user_name.indexOf("(") === -1 && user_name.indexOf(")" === -1 )) {
    //         var id_user_nickname = message.member.id;
    //         var embed = new Discord.RichEmbed()
    //         .setAuthor(getSetting('isabel_head_message_standard'))
    //         .setTitle('Purtroppo il tuo nome non è valido per questa Gilda.')
    //         .setColor(0xFF8000)
    //         .setDescription(getSetting('isabel_message_no_nickname'))
    //         .setFooter(getSetting('isabel_footer_message_standard'))
    //         client.users.get(id_user_nickname).send({embed});
    //     }
    // }
    
    if (message.content.includes('Grande gesto')) {
        message.channel.send("Hei " + message.member.user + " graaaaaaande geeeeesto!");
    }

    if (message.content.includes('grande gesto')) {
        message.channel.send("Hei " + message.member.user + " graaaaaaande geeeeesto!");
    }

    if (Censunre(message.content)) {
        message.channel.send("Hei " + message.member.user + " :rage:! Per piacere smettila di imprecare, alla prossima ti banno!");
    }

    if(message.content.indexOf(config.prefix) !== 0) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(command === 'help') {
        var embed = new Discord.RichEmbed()
        .setAuthor('Ciao io sono LadyIsabel')
        .setTitle('Ho molte funzioni utili per la gilda')
        .setColor(0xFF0000)
        .setDescription('Usa i comandi sotto indicati:')
        .addField("!help", 'Il comando per vedere tutti i comandi ahah >.<')
        .addField("!ping", 'Questo comando mostra i tempi di risposta del server')
        .addField("!livello", 'Mostra il tuo livello nella Gilda')
        .addField("!cosacaccio", 'Non sai cosa cacciare? Ci penso io :stuck_out_tongue_winking_eye:  ')
        .addField("!ctop", 'Mostra i top 10 più attivi nella Gilda')//nuovo
        .addField("!dtop", 'Mostra i top 10 più attivi nella giornata')//nuovo
        .addField("!infoserver", 'Mostra i dati del server')
        .addField("!pallaotto", 'Sei indeciso o non sai il tuo futuro? Chiedi a LadyIsabel!')//nuovo
        .addField("!semessage", 'Invia manualmente un messaggio di servizio.. Solo lo staff può farlo, mi dispiace.')
        .addField("!say <messaggio>", 'Questo è un comando magico.. Solo lo staff può farlo, mi dispiace.')
        .setFooter('Quando scrivi un comadno non serve scrivere i siboli < e > servono solo a farti capire come strutturare il comando.')
        message.channel.send({embed});
    }

    if(command === "ping") {
        const m = await message.channel.send("Ping?");
        m.edit(`Pong! Latenza server ${m.createdTimestamp - message.createdTimestamp}ms. Latenza API ${Math.round(client.ping)}ms`);
    }

    if(command === "bacio") {
        message.channel.send(":kissing_heart:");
    }

    if(command === "cosacaccio") {
        var id_monster = Math.floor(Math.random() * 34);
        var monster = getMonster(id_monster);
        var name = monster.map(a => a.name);
        await message.channel.send("Ciao " + message.member.user + "! Per me oggi dovresti cacciare un **" + name + "** ! :kissing_heart:");
    }

    if(command === "say") {
        if(!message.member.roles.some(r=>["Admin", "Moderatori", "Developer"].includes(r.name)) )
            return message.reply("Mi dispiace, ma non hai le autorizzazioni per usare questo comando.");
        const sayMessage = args.join(" ");
        message.delete().catch(O_o=>{}); 
        message.channel.send(sayMessage);
    }

    if(command === "livello") {
        var livel_user = usersList(message.member.user.id);
        const m = await message.channel.send("Attendi..");
        if(livel_user.length > 0){
            var messages = livel_user.map(a => a.messages);
            if ( messages < 10 ) {
                m.edit("Ciao " + message.member.user + "! Purtroppo non hai scritto molto.. scrivi di più e sicuramente aumenterai il tuo punteggio! :kissing_heart:");
            } else {
                m.edit("Ciao " + message.member.user + "! Ma sei fortissimo il tuo livello di partecipazione è di :** " + messages + " **; Il tuo grado è di:** " + getGradoCacciatore(messages) + " **. Sei stato proprio bravo :kissing_heart:");
            }
        } else {
            m.edit("Ciao " + message.member.user + "! Purtroppo non hai scritto molto.. scrivi di più e sicuramente aumenterai il tuo punteggio! :kissing_heart:");
        }
    }

    if(command === "ctop") {
        var list_users_top = getTopListMessageAllTime();
        var post = 10;
        const m = await message.channel.send("Attendi..");
        var messages_text = "Eccola la classifica top 10:\n";
        messages_text += "----------\n";
        for (var i = list_users_top.length - 1; i >= 0; i--) {
            var id_discord = list_users_top[i].id_discord;
            var messages = list_users_top[i].messages;
            messages_text += "Posizione: " + post + " - Nome <@" + id_discord + "> - messaggi:  " + messages + "\n";
            var post = post - 1;
        }
        messages_text += "----------\n";
        messages_text += "Ti sei posizionato bene?\n";
        m.edit(messages_text);
    }

    if(command === "dtop") {
        var list_users_top = getTopListMessageDay();
        var post = 10;
        const m = await message.channel.send("Attendi..");
        var messages_text = "Eccola la classifica top 10:\n";
        messages_text += "----------\n";
        for (var i = list_users_top.length - 1; i >= 0; i--) {
            var id_discord = list_users_top[i].id_discord;
            var messages = list_users_top[i].messages_day;
            messages_text += "Posizione: " + post + " - Nome <@" + id_discord + "> - messaggi:  " + messages + "\n";
            var post = post - 1;
        }
        messages_text += "----------\n";
        messages_text += "Ti sei posizionato bene?\n";
        m.edit(messages_text);
    }

    if (command === "pallaotto") {
        var id_risposta = Math.floor(Math.random() * 20) + 1;
        var risposta = getRispose(id_risposta);
        var embed = new Discord.RichEmbed()
        .setTitle('Il gioco della palla da otto')
        .setColor(0xFF0000)
        .setDescription('La mia risposta è.. '+risposta+'.')
        message.channel.send({embed});
    }

    if (command === "infoserver") {
        var text_message = "Server Nome: LA FLOTTA NERD\n";
        text_message += "------\n";
        text_message += "Ci sono N° "+client.users.size+" utenti nel server.\n";
        text_message += "Ci sono N° "+client.channels.size+" canali nel server.\n";
        text_message += "------\n";
        message.channel.send(text_message);
    }

    if (command === "semessage") {
        if(!message.member.roles.some(r=>["Admin", "Moderatori", "Developer"].includes(r.name)) )
            return message.reply("Mi dispiace, ma non hai le autorizzazioni per usare questo comando.");
        getServiceMessage()
    }
});

/**
 * 
 * Eventi registrati.
 * 
 */

client.on('raw', event => {
    //console.log('\nRaw event data:\n', event);
    if (event.t === 'MESSAGE_CREATE') {
        var id_user = event.d.author.id;
        var mentions = event.d.mentions;
        var id_channel = event.d.channel_id;
        for (let index = 0; index < mentions.length; index++) {
            var id_mention = mentions[index].id;
            if(id_mention == config.bot_id_1 ){
                var mentions = getMentionsBot(id_user);
                if (mentions == 0) {
                    client.channels.get(id_channel).send('<@'+ id_user +'> Sai che sono un Bot e non posso risponderti, per piacere non menzionarmi :D');
                } else if ( mentions == 1 ) {
                    client.channels.get(id_channel).send('<@'+ id_user +'> Per piacere smettila!');
                } else if ( mentions == 2 ) {
                    client.channels.get(id_channel).send('Hei!<@'+ id_user +'> Ho detto di smetterla!!!!!!!');
                } else if ( mentions == 3 ) {
                    client.channels.get(id_channel).send('<@'+ id_user +'> BASTAAAAAAAA!!!!!!!!!!!!!!!!!!!!!!');
                } else if ( mentions == 4 ) {
                    client.channels.get(id_channel).send('https://media1.tenor.com/images/da022ba3792e2486459abf1dc53864ec/tenor.gif?itemid=5641362');
                } else if ( mentions == 7 ) {
                    client.channels.get(id_channel).send('https://tenor.com/view/cant-hear-you-jim-carrey-gif-11229249');
                } else if ( mentions == 9 ) {
                    client.channels.get(id_channel).send('https://tenor.com/view/brave-merida-no-listen-ginger-gif-5528367');
                } else {
                    client.channels.get(id_channel).send('<@'+ id_user +'> Non ti parlo più...');
                }
            }
            addMentionsBot(id_user);
        }
    }
});

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

function getServiceMessage(){
    if (getSetting('service_message') == 1) {
        var frasi = getFrasi();
        for (let index = 0; index < frasi.length; index++) {
            message = unescape(frasi[index].message);
            log('Bot Ledy Messaggio di servizio inviato;');
            var embed = new Discord.RichEmbed()
            .setTitle('Messaggio di servizio! :nerd: ')
            .setColor(0xFF0000)
            .setDescription(message)
            client.channels.find(ch => ch.name === '4-chiacchiere').send({embed});
        }
    }
}

async function asyncCall(id_discord, message_chanel_id) {
    var liv_usr = getUser(id_discord);
    if (liv_usr.length > 0) {
        var messages = liv_usr.map(a => a.messages);
        var livel_users = getLivelUser(messages);
        if (livel_users.length > 0) {
            var result = await getGradoCacciatore(messages);
            client.channels.get(message_chanel_id).send("Ciao <@" + id_discord + ">! Hai raggiunto un nuovo rango all'interno della nostra gilda:** " + result + " **; Sei stato proprio un buon cacciatore :kissing_heart:");
        }
    }
}

function getRispose(id){
    if ( id == 1 ) {
        return "Per quanto posso vedere, sì";
    } else if ( id == 2 ) {
        return "È certo";        
    } else if ( id == 3 ) {
        return "È decisamente così";
    } else if ( id == 4 ) {
        return "Molto probabilmente";
    } else if ( id == 5 ) {
        return "Le prospettive sono buone";
    } else if ( id == 6 ) {
        return "Le mie fonti indicano di sì";
    } else if ( id == 7 ) {
        return "Senza alcun dubbio";
    } else if ( id == 8 ) {
        return "Sì";
    } else if ( id == 9 ) {
        return "Sì, senza dubbio";
    } else if ( id == 10 ) {
        return "Ci puoi contare";
    } else if ( id == 11 ) {
        return "È difficile rispondere, prova di nuovo";
    } else if ( id == 12 ) {
        return "Rifai la domanda più tardi";
    } else if ( id == 13 ) {
        return "Meglio non risponderti adesso";
    } else if ( id == 14 ) {
        return "Non posso predirlo ora";
    } else if ( id == 15 ) {
        return "Concentrati e rifai la domanda";
    } else if ( id == 16 ) {
        return "Non ci contare";
    } else if ( id == 17 ) {
        return "La mia risposta è no";
    } else if ( id == 18 ) {
        return "Le mie fonti dicono di no";
    } else if ( id == 19 ) {
        return "Le prospettive non sono buone";
    } else if ( id == 20 ) {
        return "Molto incerto";
    } else {
        return "Mi puoi rifare la domanda, non ho capito..";   
    }
}

function Censunre(str) {
    var lista_bestemmie = ["dio cane","diocane","porcodio","porco dio"];
    var arrayLength = lista_bestemmie.length;
    var status = 0;
    for (var i = 0; i < arrayLength; i++) {
        var pattern = new RegExp(lista_bestemmie[i],'i');
        if(pattern.test(str)) {
            status += 1;
        }
    }
    if(status >= 1 ) {
        return true;
    } else {
        return false;
    }
}

function getGradoCacciatore(livel){
    var name = "";
    if (livel >= 10 && livel < 30 ){
        name = "Novizio LIV I";
    } else if (livel >= 30 && livel < 50 ){
        name = "Novizio LIV II";
    } else if (livel >= 50 && livel < 100 ){
        name = "Novizio LIV III";
    } else if (livel >= 100 && livel < 200 ){
        name = "Apprendista LIV I";
    } else if (livel >= 200 && livel < 300 ){
        name = "Apprendista LIV II";
    } else if (livel >= 300 && livel < 400 ){
        name = "Apprendista LIV III";
    } else if (livel >= 400 && livel < 500 ){
        name = "Felyne Lavapiatti LIV I";
    } else if (livel >= 500 && livel < 600 ){
        name = "Felyne Lavapiatti LIV II";
    } else if (livel >= 600 && livel < 750 ){
        name = "Felyne Lavapiatti LIV III";
    } else if (livel >= 750 && livel < 1000 ){
        name = "Felyne Alchimista";
    } else if (livel >= 1000 && livel < 1250 ){
        name = "Felyne Guaritore";
    } else if (livel >= 1250 && livel < 1500 ){
        name = "Mercante di ossa";
    } else if (livel >= 1500 && livel < 1750 ){
        name = "Mercante di spezie";
    } else if (livel >= 1750 && livel < 2000 ){
        name = "Mercante di gemme";
    } else if (livel >= 2000 && livel < 2250 ){
        name = "Forgiatore Novizio";
    } else if (livel >= 2250 && livel < 2500 ){
        name = "Forgiatore Apprendista";
    } else if (livel >= 2500 && livel < 2750 ){
        name = "Forgiatore Mastro";
    } else if (livel >= 2750 && livel < 3000 ){
        name = "Assistente Incapace";
    } else if (livel >= 3000 && livel < 3250 ){
        name = "Assistente Esperto";
    } else if (livel >= 3250 && livel < 3500 ){
        name = "Soldato Imbranato";
    } else if (livel >= 3500 && livel < 3750 ){
        name = "Soldato Spavaldo";
    } else if (livel >= 3750 && livel < 4000 ){
        name = "Soldato Romantico";
    } else if (livel >= 4000 && livel < 4250 ){
        name = "Soldato Elite";
    } else if (livel >= 4250 && livel < 4500 ){
        name = "Amico della quinta";
    } else if (livel >= 4500 && livel < 4750 ){
        name = "Baby Drago";
    } else if (livel >= 4750 && livel < 5000 ){
        name = "Drago Spavaldo";
    } else if (livel >= 5000 && livel < 5250 ){
        name = "Drago Imperatore";
    } else if (livel >= 5250 && livel < 5500 ){
        name = "Spacca Draghi";
    } else if (livel >= 5500 && livel < 5750 ){
        name = "Sterminatore di draghi";
    } else if (livel >= 5750 ){
        name = "Stella di zaffiro";
    }
    return name;
}

/**
 * 
 * Model Estrazione dati
 * 
 */
function getMentionsBot(id_discord){
    const result = connection.query("SELECT bot_mention AS bot_mention FROM users WHERE id_discord = '"+ id_discord +"'");
    return result[0].bot_mention;
}

function addMentionsBot(id_discord){
    connection.query("UPDATE users SET bot_mention = bot_mention + 1 WHERE id_discord = '"+ id_discord +"'");
}

function getSetting(name){
    const result = connection.query("SELECT value AS value FROM settings WHERE name = '"+ name +"'");
    return decodeURIComponent(result[0].value);
}

function usersList(id_discord){
    const result = connection.query("SELECT * FROM users WHERE id_discord = '"+ id_discord +"'");
    return result;
}

function addUser(id_discord){
    connection.query("SET sql_mode = 'NO_ZERO_DATE'");
    connection.query("INSERT INTO users (id_discord, messages) VALUES ("+ id_discord +", 0)");
}

function deleteUser(id_discord){
    connection.query("DELETE FROM users WHERE id_discord = '" + id_discord + "'");
}

function getMonster(id_monster){
    const result = connection.query("SELECT name FROM monster WHERE id_monster = '"+ id_monster +"'");
    return result;
}

function getTopListMessageAllTime(){
    const result = connection.query("SELECT * FROM `users` ORDER BY `users`.`messages` DESC LIMIT 10");
    return result;
}

function getTopListMessageDay(){
    const result = connection.query("SELECT * FROM `users` ORDER BY `users`.`messages_day` DESC LIMIT 10");
    return result;
}

function getFrasi(){
    const result = connection.query("SELECT * FROM messages ");
    return result;
}

function getUser(id_discord) {
    var result = connection.query("SELECT * FROM users WHERE id_discord = '" + id_discord + "'");
    return result;
}

function getLivelUser(messages) {
    var result = connection.query("SELECT * FROM level WHERE step = '" + messages + "'");
    return result;
}

function resetRoleCounter(id_discord) {
    connection.query("UPDATE users SET rule_selected  = 0 WHERE id_discord = '" + id_discord + "'");
}

function addRoleCounter(id_discord) {
    connection.query("UPDATE users SET rule_selected  = rule_selected  + 1 WHERE id_discord = '" + id_discord + "'");
}

function users(id_discord) {
    var result = connection.query("SELECT * FROM users WHERE id_discord = '" + id_discord + "'");
    return result;
}

client.login(config.token);