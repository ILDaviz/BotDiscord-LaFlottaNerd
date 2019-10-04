const bot = require('../bot.js');
const botModel = require('../helpers/Models');
const botCache = require('../helpers/Cache');
const botUtil = require('../helpers/Util')

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

    let embed = new Discord.RichEmbed()
    .setAuthor(`Benvenuto nel server Discord de LA FLOTTA NERD!`)
    .setTitle(botCache.selectCacheText('welcome_title_message'))
    .setColor('RANDOM')
    .setDescription('Ciao' + member + ',' + botCache.selectCacheText('welcome_message'))
    .setFooter(botCache.selectCacheText('footer_message_standard','ladyisabel'))
    
    channel.send({embed});
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