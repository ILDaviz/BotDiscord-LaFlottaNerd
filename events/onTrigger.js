const bot = require('../bot.js');
const botModel = require('../helpers/Models');
const botCache = require('../helpers/Cache');
const botUtil = require('../helpers/Util');
const Discord = require('discord.js');

bot.on('message', (message) => {

	if (message.author.bot) return;

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