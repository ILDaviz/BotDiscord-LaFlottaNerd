'user strict';

const bot = require('../bot.js');
const botModel = require('../helpers/models');
const botUtil = require('../helpers/util');
const Discord = require('discord.js');
const texts = require("../helpers/json");

bot.on('guildMemberAdd', member => {
    const channel = member.guild.channels.find(ch => ch.name === 'welcome');
    botModel.selectUser(member.id,function(err,res){
        if (err) {
            console.log(err);
        }
        if (res.length == 0) {
            botModel.insertUser(member.id,function(err,res){
                if (err) {
                    console.log(err);
                }
            });
        }
    });
    if (!channel) return;

    var roles = texts.getSetting('role_selector');
    var string_role = '';
    if (roles.length > 0) {
        for (var i = roles.length - 1; i >= 0; i--) {
            value = roles[i].role;
            emoji = roles[i].emoji;
            string_role += (`${emoji} = **"${value}"**\n`);
        }
    }

    botUtil.log('Avvio messaggio di benvenuto all\'utente <@' + member.id + '>','7ED321');

    let embed = new Discord.RichEmbed()
    embed.setAuthor(`Benvenuto nel server Discord de LA FLOTTA NERD!`);
    embed.setTitle(texts.getText('welcome_title_message'));
    embed.setColor('RANDOM');
    embed.setDescription('Ciao' + member + ',' + texts.getText('welcome_message'));
    embed.setThumbnail('https://media1.tenor.com/images/0edd53dd2110147b786329c2e24fb1d0/tenor.gif');
    embed.addField(texts.getText('message_comand_nickname_1'), texts.getText('message_comand_nickname_2'));
    embed.addField(texts.getText('message_role_title_small'), string_role);
    embed.setFooter(texts.getText('footer_message_standard','ladyisabel'))
    channel.send({ embed }).then(function (message) {
        for (let i = 0; i < roles.length; i++) {
            message.react(roles[i].emoji);
        }
    });
});

bot.on('guildMemberRemove', member => {
    const channel = member.guild.channels.find(ch => ch.name === 'welcome');
    botModel.deleteUser(member.id,function(err,res){
        if (err) {
            console.log(err);
        }
    });
    if (!channel) return;
    botUtil.log('Avvio messaggio di addio all\'utente <@' + member.id + '>','D0021B');
    channel.send("<@" + member.id + "> ha lasciato il server");
});