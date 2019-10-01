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
const botModel = require('./model/Models');
const botUtil = require('./util/Util');
const botCache = require('./util/Cache');

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
    let users_list_1 = usersList(member.id);
    if (users_list_1.length = 0) {
    addUser(member.id);
    }
    if (!channel) return;
    let embed = new Discord.RichEmbed()
    .setAuthor(`Benvenuto nel server Discord de LA FLOTTA NERD!`)
    .setTitle(botUtil.selectCacheText('isabel_welcome_title_message','ladyisabel'))
    .setColor(0xFF8000)
    .setDescription('Ciao' + member + ',' + botUtil.selectCacheText('isabel_welcome_message','ladyisabel'))
    .setFooter(botUtil.selectCacheText('isabel_footer_message_standard','ladyisabel'))
    channel.send({embed});
});

// Crea se un utente se ne va.
client.on('guildMemberRemove', member => {
    const channel = member.guild.channels.find(ch => ch.name === 'welcome');
    botModel.deleteUser(member.id,function(err,res){ });
    if (!channel) return;
    channel.send("No Perché!!! L'utente <@" + member.id + "> ha lasciato il server..:sob:");
});

client.on("message", async message => {
    if (message.author.bot) return;
    if (message.content.indexOf(config.prefix) !== 0) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    //const command = args.shift().toLowerCase();
    asyncCall(message.author.id, message.channel.id);
    if (botUtil.censure(message.content)) {
        message.channel.send("Hei " + message.member.user + " :rage:! Per piacere smettila di imprecare, alla prossima ti banno!");
    }
});
/**
 * Stampa il messaggio del livello se aumentato.
 * @param {*} id_discord riferimento id discord
 * @param {*} message_chanel_id il canale dove ha scritto l'utente il messaggio di passaggio
 */
async function asyncCall(id_discord, message_chanel_id) {
    const mci = message_chanel_id; 
    const id = id_discord;
    botModel.selectUser(id_discord,function(err,res){
        if (res.length > 0) {
            const n_messages = res.map(a => a.messages);
            botModel.selectLivelUser(n_messages,function(err,res){
                if (res.length > 0) {
                    let result = botUtil.getGradoCacciatore(n_messages);
                    client.channels.get(mci).send("Ciao <@" + id + ">! Hai raggiunto un nuovo rango all'interno della nostra gilda:** " + result + " **; Sei stato proprio un buon cacciatore :kissing_heart:");
                } 
            });
        }
    });
}

client.on("message", async message => {
    if (message.author.bot) return;
    if (message.content.indexOf(config.prefix) !== 0) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command === 'help') {
        let embed = new Discord.RichEmbed()
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
        let embed = new Discord.RichEmbed()
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
        let id_monster = Math.floor(Math.random() * 34);
        botModel.selectMonster(id_monster,function(err,res){
            let name = res.map(a => a.name);
            await message.channel.send("Ciao " + message.member.user + "! Per me oggi dovresti cacciare un **" + name + "** ! :kissing_heart:");
        });
        
    }

    if(command === "say") {
        if(!message.member.roles.some(r=>["Admin", "Moderatori", "Developer"].includes(r.name)) )
            return message.reply("Mi dispiace, ma non hai le autorizzazioni per usare questo comando.");
        const sayMessage = args.join(" ");
        message.delete().catch(O_o=>{}); 
        message.channel.send(sayMessage);
    }

    if(command === "livello") {
        const m = await message.channel.send("Attendi..");
        botModel.selectUser(message.member.user.id,function(err,res){
            let messages = res.map(a => a.messages);
            if(messages > 0){
                if ( messages < 10 ) {
                    m.edit("Ciao " + message.member.user + "! Purtroppo non hai scritto molto.. scrivi di più e sicuramente aumenterai il tuo punteggio! :kissing_heart:");
                } else {
                    m.edit("Ciao " + message.member.user + "! Ma sei fortissimo il tuo livello di partecipazione è di :** " + messages + " **; Il tuo grado è di:** " + botUtil.getGradoCacciatore(messages) + " **. Sei stato proprio bravo :kissing_heart:");
                }
            } else {
                m.edit("Ciao " + message.member.user + "! Purtroppo non hai scritto molto.. scrivi di più e sicuramente aumenterai il tuo punteggio! :kissing_heart:");
            }
        });
    }

    if(command === "ctop") {
        const m = await message.channel.send("Attendi..");
        botModel.seletTopListMessageAllTime(function(err,res){
            var post = 10;
            var messages_text = "Eccola la classifica top 10:\n";
            messages_text += "----------\n";
            for (let i = res.length - 1; i >= 0; i--) {
                let id_discord = res[i].id_discord;
                let messages = res[i].messages;
                messages_text += "Posizione: " + post + " - Nome <@" + id_discord + "> - messaggi:  " + messages + "\n";
                var post = post - 1;
            }
            messages_text += "----------\n";
            messages_text += "Ti sei posizionato bene?\n";
            m.edit(messages_text);
        });
    }

    if(command === "dtop") {
        const m = await message.channel.send("Attendi..");
        botModel.seletTopListMessageDay(function(err,res){
            var post = 10;
            var messages_text = "Eccola la classifica top 10:\n";
            messages_text += "----------\n";
            for (let i = res.length - 1; i >= 0; i--) {
                let id_discord = res[i].id_discord;
                let messages = res[i].messages;
                messages_text += "Posizione: " + post + " - Nome <@" + id_discord + "> - messaggi:  " + messages + "\n";
                var post = post - 1;
            }
            messages_text += "----------\n";
            messages_text += "Ti sei posizionato bene?\n";
            m.edit(messages_text);
        });
    }

    if (command === "pallaotto") {
        let risposta = botUtil.getRispose();
        let embed = new Discord.RichEmbed()
        .setTitle('Il gioco della palla da otto')
        .setColor(0xFF0000)
        .setDescription('La mia risposta è.. '+risposta+'.')
        message.channel.send({embed});
    }

    if (command === "infoserver") {
        let text_message = "Server Nome: LA FLOTTA NERD\n";
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
        const id_user = event.d.author.id;
        let mentions = event.d.mentions;
        let id_channel = event.d.channel_id;
        for (let index = 0; index < mentions.length; index++) {
            let id_mention = mentions[index].id;
            if(id_mention == config.bot_id_1 ){
                botModel.selectMentionBot(id_user,function(err,mentions){
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
                });
            }
            botModel.updateMentionBot(id_user,function(err,res){});
        }
    }
});
/**
 * Crea un log che stamperà su discord
 * @param { string } note 
 */
function log(note) {
    let embed = new Discord.RichEmbed()
        .setTitle('-- LOG --')
        .setColor(0xFFFF)
        .setDescription(note)
    client.channels.get(config.channel_log).send({ embed });
}
/**
 * Stampa il messaggio di servizio
 */
function getServiceMessage(){
    if (getSettingTag('service_message') == 1) {
        let frasi = getFrasi();
        for (let index = 0; index < frasi.length; index++) {
            message = unescape(frasi[index].message);
            log('Bot Ledy Messaggio di servizio inviato;');
            let embed = new Discord.RichEmbed()
            .setTitle('Messaggio di servizio! :nerd: ')
            .setColor(0xFF0000)
            .setDescription(message)
            client.channels.find(ch => ch.name === '4-chiacchiere').send({embed});
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