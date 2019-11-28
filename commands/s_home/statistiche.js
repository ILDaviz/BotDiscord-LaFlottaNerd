const Discord = require('discord.js');
const moment = require('moment');
const botModel = require('../../helpers/Models'); 
const botUtil = require('../../helpers/Util');
const texts = require("../../helpers/Texts");

exports.run = async (message, bot) => {

    const user = message.mentions.users.first() || message.author;
    const member = message.mentions.members.first() || message.member;

    botModel.selectUser(member.id,function(err,res){

        if (err) {
            return message.channel.send('Mi dispiace ma c\'è stato un errore..');
        }

        let embed = new Discord.RichEmbed();
        embed.setColor("RANDOM");
        embed.setThumbnail(user.avatarURL);
        embed.addField("Utente", `${user}`, true);
        embed.addField("ID:", `${member.id}`, true);
        embed.addField("Nickname:", `${member.nickname !== null ? `${member.nickname}` : 'Niente..'}`, true);
        embed.addField("Stato:", `${user.presence.status}`, true);
        embed.addField("Nel server:", message.guild.name, true);
        embed.addField("Stai giocando ad..:", `${user.presence.game ? user.presence.game.name : 'Niente..'}`, true);
        embed.addField("Sei un bot?:", `${user.bot}`, true);

        if (!user.bot) {
            embed.addField('Sei entrato nel server:', `${res[0].presence_update !== undefined ? `${res[0].presence_update}` : 'None'}`, true);
            embed.addField('Le tue reazioni sono:', `${res[0].presence_reaction !== undefined ? `${res[0].presence_reaction}` : 'None'}`, true);
            embed.addField('Il numero dei tuoi messaggi è di:',`${res[0].messages !== undefined ? `${res[0].messages}` : 'None'}`, true);
            let levbel = botUtil.getGradoCacciatore(res[0].messages);
            embed.addField('Il tuo livello nella gilda è di:', `${levbel}`, true);
            embed.addField('N.B.','Questi valori indicati sono indicativi');
        }

        embed.addBlankField();
        embed.setImage(user.avatarURL);
        embed.addField("Se entrato nel server il:", `${moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY")}`, true);
        embed.addField("Ti sei registrato qui su discord il:", `${moment.utc(user.createdAt).format("dddd, MMMM Do YYYY")}`, true);
        embed.addField("I toui ruoli:", member.roles.map(roles => `${roles}`).join(', '), true);
        embed.setFooter(`Il messaggio è stato avviato da ${message.author.username}#${message.author.discriminator}`);
        message.channel.send({ embed });
    })
};

exports.conf = {
    name: "Statistiche",
    fullcmd: "statistiche",
    alias: "stat",
    description: texts.getText("command_s_home_statistiche_description"),
    timer: 0,
    tokenCost: 0,
    subClass: 'start',
    displayHelp: 1
};