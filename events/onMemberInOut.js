const bot = require('../bot.js').default;
const botModel = require('../helpers/Models');
const botCache = require('../helpers/Cache');
const botUtil = require('../helpers/Util')
const Discord = require('discord.js');
const emoji = ['👹', '🕹', '🖥', '🌃', '🎆', '🐲', '🐗', '🌵', '💣', '🔪', '🔋', '🔌', '🗡', '📼'];
const toSend = botUtil.generaMessaggioSelezionaGiocoSmall(emoji);
const role = botCache.selectCacheRole('role');
const role_n = role.length;

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

    var x = '';
    if (role.length > 0) {
        for (var i = role.length - 1; i >= 0; i--) {
            value = role[i];
            x += (`${emoji[i]} = **"${value}"**\n`);
        }
    }

    let embed = new Discord.RichEmbed()
    .setAuthor(`Benvenuto nel server Discord de LA FLOTTA NERD!`)
    .setTitle(botCache.selectCacheText('welcome_title_message'))
    .setColor('RANDOM');
    embed.setDescription('Ciao' + member + ',' + botCache.selectCacheText('welcome_message'));
    embed.setThumbnail('https://media1.tenor.com/images/0edd53dd2110147b786329c2e24fb1d0/tenor.gif');
    embed.addField(botCache.selectCacheText('message_comand_nickname_1'), botCache.selectCacheText('message_comand_nickname_2'));
    embed.addField(botCache.selectCacheText('message_role_title_small'),x);
    embed.setFooter(botCache.selectCacheText('footer_message_standard','ladyisabel'))
    channel.send({ embed }).then(function (message) {
        for (let i = 0; i < role.length; i++) {
            message.react(emoji[i]);
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
    channel.send("No Perché!!! L'utente <@" + member.id + "> ha lasciato il server..:sob:");
});