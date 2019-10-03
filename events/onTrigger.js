const bot = require('../bot.js');
const botModel = require('../helpers/Models');
const botCache = require('../helpers/Cache');
const botUtil = require('../helpers/Util');
const Discord = require('discord.js');




bot.on('message', (message) => {

	if (message.author.bot) return;
    
    let a = botUtil.checkPresence('elementone','a',message.content);
    let b = botUtil.checkPresence('elementone','b',message.content);
    let c = botUtil.checkPresence('elementone','c',message.content);

    if (a == true & b == true & c == true ) {
        let emb = new Discord.RichEmbed()
        .setTitle(`Ti do un suggerimento! Spero di esserti d'aiuto :D`)
        .setDescription("Per seleziona un canale della gilda hai due modi o entri nel canale <#551789571483107328> o scrivi in chat il comando " + bot.conf.prefix + "sgame")    
        message.channel.send(emb);
    }
    


});