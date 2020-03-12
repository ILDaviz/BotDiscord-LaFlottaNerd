

const cmds = require('../../helpers/loadcommands').cmdDetail;
const texts = require('../../helpers/json');
const Discord = require('discord.js');

exports.run = async (message, bot) => {
    if (!message.member.roles.some(r => ["Admin", "Developer"].includes(r.name)))
        return message.reply("Mi dispiace, ma non hai le autorizzazioni per usare questo comando.");
    
    // Prima parte
    let prima_parte = new Discord.RichEmbed();
    prima_parte.setColor("RANDOM");
    prima_parte.setThumbnail(texts.getText('descrizione_bot_prima_gif'));
    prima_parte.setTitle(texts.getText('descrizione_bot_prima_parte_titolo'));
    prima_parte.setDescription(texts.getText('descrizione_bot_prima_parte_descrizione'));
    prima_parte.addField(texts.getText('descrizione_bot_prima_parte_field_1-1'), texts.getText('descrizione_bot_prima_parte_field_1-2'));
    message.channel.send(prima_parte);

    // Seconda parte
    let seconda_parte = new Discord.RichEmbed();
    seconda_parte.setColor("RANDOM");
    seconda_parte.setThumbnail(texts.getText('descrizione_bot_seconda_parte_gif'));
    seconda_parte.setTitle(texts.getText('descrizione_bot_seconda_parte_title'));
    seconda_parte.setDescription(texts.getText('descrizione_bot_seconda_parte_descrizione'));
    message.channel.send(seconda_parte);

    let title_autori = new Discord.RichEmbed();
    title_autori.setColor("RANDOM");
    title_autori.setThumbnail(texts.getText('descrizione_bot_title_autori_gif'));
    title_autori.setTitle(texts.getText('descrizione_bot_title_autori_title'));
    title_autori.addField(texts.getText('descrizione_bot_title_autori_field_1-1'), texts.getText('descrizione_bot_title_autori_field_1-2'));
    title_autori.addField(texts.getText('descrizione_bot_title_autori_field_2-1'), texts.getText('descrizione_bot_title_autori_field_2-2'));
    title_autori.addField(texts.getText('descrizione_bot_title_autori_field_3-1'), texts.getText('descrizione_bot_title_autori_field_3-2'));
    message.channel.send(title_autori);

    let msg = '';

    cmds.sort((a, b) => {
        return b.cost < a.cost ? 1
            : b.cost > a.cost ? -1
                : 0;
    });

    cmds.forEach((cmd) => {
        if (cmd.displayHelp === 1 && (cmd.subClass === 'start' || cmd.subClass === 's_utility') ) {
            msg += `\n\n**${bot.conf.prefix}${cmd.cmdName}** ${cmd.description}`;
        }
    });

    let emb3 = new Discord.RichEmbed();
    emb3.setTitle('Ecco tutti i comandi del BOT');
    emb3.setThumbnail('https://media1.tenor.com/images/0edd53dd2110147b786329c2e24fb1d0/tenor.gif');
    emb3.setColor("RANDOM");
    emb3.setDescription(msg);
    emb3.setFooter(bot.conf.footer_standard);
    message.channel.send(emb3);
};

exports.conf = {
    name: "Descrizione",
    fullcmd: "descrizione",
    alias: "descbot",
    description: "",
    timer: 0,
    tokenCost: 0,
    subClass: 'utility_staff',
    displayHelp: 0
};