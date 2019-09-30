/*
**********************************************************************
*   Bot LADYISABEL
*   @Davidgalet
*   www.davidev.it
*   lady.js
**********************************************************************
*/

const Discord = require("discord.js");
const schedule = require('node-schedule');
const config = require("./config_lady.json");
const botModel = require('./model/botModel');
const functionBot = require('./functionBot.js');

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
    channel.send("No Perché!!! L'utente <@" + member.id + "> ha lasciato il server..:sob:");
});

client.on("message", async message => {
    if (message.author.bot) return;
    if (message.content.indexOf(config.prefix) !== 0) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    asyncCall(message.author.id, message.channel.id);
    if (Censunre(message.content)) {
        message.channel.send("Hei " + message.member.user + " :rage:! Per piacere smettila di imprecare, alla prossima ti banno!");
    }
});

client.on("message", async message => {
    if (message.author.bot) return;
    if (message.content.indexOf(config.prefix) !== 0) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command === 'help') {
        var embed = new Discord.RichEmbed()
            .setAuthor('Ciao io sono LadyIsabel')
            .setTitle('Ho molte funzioni utili per la gilda')
            .setColor(0xFF0000)
            .setDescription('Usa questi comandi per entrare nella sezione dedicata!')
            .addField("!help_giochi_bot", 'Interagisci con me un sacco di giochi disponibili')
            .addField("!help_classifiche", 'Le classifiche della gilda, giornaliere e totali')
            .addField("!help_mhw", 'I comandi dedicati a Monster Hunter World!')
            .addField("!help_gilda", 'Non sai cosa fare o non sai come fare? Ti consiglio io!')
            .addField("!help_utility", 'Lista di comandi utili e meno..')
            .addField("!donazione", 'Ti piacciono i Bot di questa gilda? Offrimi un caffé!')
            .setFooter('Quando scrivi un comadno non serve scrivere i siboli < e > servono solo a farti capire come strutturare il comando.')
        message.channel.send({ embed });
    }
});

client.on("message", async message => {

    //Che non sia il bot
    if(message.author.bot) return;

    if(message.content.indexOf(config.prefix) !== 0) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(command === 'help_old') {
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
 * Crea un log che stamperà su discord
 * @param { string } note 
 */
function log(note) {
    var embed = new Discord.RichEmbed()
        .setTitle('-- LOG --')
        .setColor(0xFFFF)
        .setDescription(note)
    client.channels.get(config.channel_log).send({ embed });
}
/**
 * Stampa il messaggio di servizio
 */
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
/**
 * Stampa il messaggio del livello se aumentato.
 * @param {*} id_discord riferimento id discord
 * @param {*} message_chanel_id il canale dove ha scritto l'utente il messaggio di passaggio
 */
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
/**
 * Messaggi di servizio
 */
schedule.scheduleJob('0 9 * * *', function () {
    getServiceMessage();
});
schedule.scheduleJob('0 13 * * *', function () {
    getServiceMessage();
});
schedule.scheduleJob('0 17 * * *', function () {
    getServiceMessage();
});
schedule.scheduleJob('0 21 * * *', function () {
    getServiceMessage();
});

client.login(config.token);