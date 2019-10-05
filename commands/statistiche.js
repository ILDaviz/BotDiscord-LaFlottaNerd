let Discord = require('discord.js');
let moment = require('moment');
let botModel = require('../helpers/Models'); 

exports.run = async (message, bot) => {


    const user = message.mentions.users.first() || message.author;
    const member = message.mentions.members.first() || message.member;

    botModel.selectUser(member.id,function(err,res){
        if (err) {
            return message.channel.send('Mi dispiace ma c\'è stato un errore..');
        }
    
        let embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setThumbnail(user.avatarURL)
        .addField("Utente", `${user}`, true)
        .addField("ID:", `${member.id}`, true)
        .addField("Nickname:", `${member.nickname !== null ? `${member.nickname}` : 'Niente..'}`, true)
        .addField("Stato:", `${user.presence.status}`, true)
        .addField("Nel server:", message.guild.name, true)
        .addField("Stai giocando ad..:", `${user.presence.game ? user.presence.game.name : 'Niente..'}`, true)
        .addField("Sei un bot?:", `${user.bot}`, true);
        if (!user.bot) {
            embed.addField('Sei entrato nel server:',`${res[0].presence_update !== undefined ? `${res[0].presence_update}` : 'None'}`, true)
            .addField('Le tue reazioni sono:',`${res[0].presence_reaction !== undefined ? `${res[0].presence_reaction}` : 'None'}`, true)
            .addField('Il numero dei tuoi messaggi è di:',`${res[0].messages !== undefined ? `${res[0].messages}` : 'None'}`, true)
            .addField('N.B.','Questi valori indicati sono indicativi');
        }
        embed.addBlankField()
        .setImage(user.avatarURL)
        .addField("Se entrato nel server il:", `${moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY")}`, true)
        .addField("Ti sei registrato qui su discord il:", `${moment.utc(user.createdAt).format("dddd, MMMM Do YYYY")}`, true)
        .addField("I toui rouli:", member.roles.map(roles => `${roles}`).join(', '), true)
        .setFooter(`Il messaggio è stato avviato da ${message.author.username}#${message.author.discriminator}`);
        
        message.channel.send({ embed });
    })
};

exports.conf = {
    name: "Statistiche",
    fullcmd: "statistiche",
    alias: "stat",
    description: "{@utente (Opzionale)} Per vedere le tue statistiche o quelle di un utente specifico! Dati, un sacco di dati! :nerd:",
    timer: 0,
    tokenCost: 0,
    subClass: 'start',
    displayHelp: 1
};