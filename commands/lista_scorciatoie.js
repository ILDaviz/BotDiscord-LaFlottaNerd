let cmds = require('../helpers/loadcommands').cmdDetail;
let Discord = require('discord.js');
let botModel = require('../helpers/Models');

exports.run = async (message, bot) => {
    const args = message.content.slice(bot.conf.prefix.length).trim().split(/ +/g);
    const args_1 = args[1];
    const limit_p = 9;

    if (!message.member.roles.some(r => ["Admin", "Developer"].includes(r.name)))
        return message.reply("Mi dispiace, ma non hai le autorizzazioni per usare questo comando.");

    if (!args_1) {
        return message.reply("Non hai indicato una pagina, se vuoi partire dalla prima pagina scrivi " + bot.conf.prefix + "listsc 1.");
    }

    botModel.selectSettings('scorciatoia', function (err, res) {
        if (err) {
            return message.channel.send('errore_text' + err);
        }
        if (res.length === 0) {
            return message.reply("Mi dispiace, ma non ci sono scorciatoie.");
        }

        const lim = 3;
        let text = '';
        let tpage = 0;
        let nrt = res.length;
        tpage = nrt / lim;
        let npr = Math.floor(tpage);
        if (args_1 == 1) {
            var limit_start = 0;
            var limit_end = lim;
        } else {
            var limit_start = lim * args_1;
            var limit_end = (lim * args_1) + lim;
        }

        if (args_1 > npr) {
            return message.reply("Il numero delle pagine è maggiore di quelle disponibili.");
        }

        for (let index = 1; index < res.length; index++) {
            let id_settings = res[index].id_settings;
            let name = res[index].name;
            var buf = Buffer.from(name);
            var id_users = name.replace('scorciatoia_','');
            let value = res[index].value;
            if (args_1 == 0) {
                if (index <= limit_end) {
                    text += "id:  [**" + id_settings + "**]  users: <@" + id_users + ">\n";
                    text += "testo : " + unescape(value) + "\n\n";
                }
            } else {
                if (index >= limit_start && index <= limit_end) {
                    text += "id:  [**" + id_settings + "**]  users: <@" + id_users + ">\n";
                    text += "testo : " + unescape(value) + "\n\n";
                }
            }
        }

        let embed = new Discord.RichEmbed()
            .setTitle('Scorciatoia:')
            .setColor('RANDOM')
            .addField("Pagina visualizzata:", "Pagina visualizzata: **" + args_1 + "**\n " + "Pagine totali: **" + npr  + "**\n Elementi totali: **" + nrt + "**")
            .addField("Scorciatoie disponibili:", text)
        message.channel.send({ embed });

    });
};

exports.conf = {
    name: "Lista_scorciatoie",
    fullcmd: "lista_scorciatoie",
    alias: "listsc",
    description: "{num pagina inserire 1 per la prima} Stampa una lista delle scorciatoie",
    timer: 0,
    tokenCost: 0,
    subClass: 'scorciatoie',
    displayHelp: 1
};