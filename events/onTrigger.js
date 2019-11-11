const bot = require('../bot.js');
const botModel = require('../helpers/Models');
const botCache = require('../helpers/Cache');
const botUtil = require('../helpers/Util');
const Discord = require('discord.js');

bot.on('message', (message) => {

	if (message.author.bot) return;
    
    // let a = botUtil.checkPresence('elementone','a',message.content);
    // let b = botUtil.checkPresence('elementone','b',message.content);
    // let c = botUtil.checkPresence('elementone','c',message.content);

    // if (a == true & b == true & c == true ) {
    //     botUtil.log('Trigger attivato tipo selezione gioco dall\'utente: <@' + message.author.id + '>');
    //     let emb = new Discord.RichEmbed()
    //     .setTitle(`Ti do un suggerimento!`)
    //     .setColor('RANDOM')
    //     // .setFooter('Dopo 10s il messaggio si cancellerà, ma quando servirà ci sarò sempre!')
    //     .setDescription("Per seleziona un canale della gilda hai due modi o entri nel canale <#551789571483107328> o scrivi in chat il comando " + bot.conf.prefix + "sgame");   
    //     // message.channel.send(emb).then(msg => {
    //     //     msg.delete(10000);
    //     // }).catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
    //     message.channel.send(emb);
    // }

    let d = botUtil.checkPresence('elementtwo', 'a', message.content);
    let e = botUtil.checkPresence('elementtwo', 'b', message.content);
    if (message.channel.name == "mhw") {
        if (d == true) {
            if (e == true) {
                botUtil.log('Trigger attivato tipo dove trovare l\'id di gioco monster hunter dall\'utente: <@' + message.author.id + '>');
                let emb = new Discord.RichEmbed()
                    .setTitle(`Ti do un suggerimento cacciatore! :loudspeaker: `)
                    .setColor('RANDOM')
                    // .setFooter('Dopo 10s il messaggio si cancellerà, ma quando servirà ci sarò sempre!')
                    .setDescription(botCache.selectCacheText('suggerimento_idmhw'));
                // message.channel.send(emb).then(msg => {
                //     msg.delete(10000);
                // }).catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
                message.channel.send(emb);
            } 
        }
    }
});