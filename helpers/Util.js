'user strict';

const botModel = require('../helpers/Models');
const texts = require('../helpers/Json');
const Discord = require('discord.js');
const bot = require('../bot')

var _this = this;

exports.checkIfUserIsBot = id_discord => {
    let guild = bot.guilds.get(bot.conf.guild_lfn_id);
    if (guild.members.get(id_discord)) {
        let itsbot = guild.members.get(id_discord).user.bot;
        return itsbot;
    }
};

exports.cleenDatabase = function (result) {
    botModel.selectUsers(function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err);
        } else {
            for (let i = 0; i < res.length; i++) {
                const id_discord = res[i].id_discord;
                let guild = bot.guilds.get('532184361068527646');
                if (!guild.member(id_discord)) {
                    botModel.deleteUser(id_discord, function (err, res) {
                        if (err) {
                            console.log("error: ", err);
                            result(err);
                        } else {
                            result(null);
                        }
                    });
                }
            }
        }
    });
}

exports.log = function (note) {
    let embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setDescription(note)
    bot.channels.get(bot.conf.chanel_log).send({ embed });
}

exports.utenteSuperamentoLivello = async function(message) {
    const mci = message.channel.id;
    const id = message.author.id;
    botModel.selectUser(id, function (err, res) {
        if (res.length > 0) {
            const n_messages = res.map(a => a.messages);
            botModel.selectLivelUser(n_messages, function (err, res) {
                if (res.length > 0) {
                    let result = _this.getGradoCacciatore(n_messages);
                    bot.channels.get(mci).send("Ciao <@" + id + ">! Hai raggiunto un nuovo rango all'interno della nostra gilda:** " + result + " ** :kissing_heart:");
                }
            });
        }
    });
}

exports.zeroValoriNegativi = () => {
    botModel.selectUsers(function (err, res) {
        for (let i = res.length - 1; i >= 0; i--) {
            let id_discord = res[i].id_discord;
            let n_message_getUsers = res[i].messages;
            if (n_message_getUsers < 0) {
                botModel.updateZeroMessage(id_discord, function (err, res) { });
                botModel.updateZeroPresence(id_discord, function (err, res) { });
            }
            let n_message_presentes = res[i].presences;
            if (n_message_presentes < 0) {
                botModel.updateZeroPresence(id_discord, function (err, res) { });
            }
        }
    });
}

exports.aggiuntaTimerDiNonAttivita = () => {
    let guilds = bot.guilds.array();
    for (let i = 0; i < guilds.length; i++) {
        bot.guilds.get(guilds[i].id).fetchMembers().then(r => {
            r.members.array().forEach(r => {
                const id_discord = r.user.id;
                //Controlla se è presente in lista bianca
                botModel.selectUserWhiteList(id_discord, function (err, res) {
                    if (res.length === 0) {
                        if (_this.checkIfUserIsBot(id_discord)) {
                            botModel.selectUser(id_discord, function (err, res) {
                                if (res.length > 0) {
                                    let presences = res[0].presences;
                                    let last_check = res[0].last_check;
                                    if (presences == 0) {
                                        //Controlla l'ultimo check se non settato lo setta!
                                        if (last_check == null) {
                                            //Aggiungi la data del check
                                            _this.log('Aggiunto timer all\'utente <@' + id_discord + '>');
                                            botModel.updateUserLastCheck(id_discord, function (err, res) { });
                                        }
                                    } else {
                                        //Resetta il clock
                                        if (last_check !== null) {
                                            _this.log('Tolto timer all\'utente <@' + id_discord + '>');
                                            botModel.updateUserLastCheck(id_discord, function (err, res) { });
                                        }
                                    }
                                }
                            });
                        }
                    }
                });
            });
        });
    }
}

exports.passaggioSeiGiorniPostConteggio = () => {
    botModel.selectNotifiedUsers(function (err, res) {
        if (res.length > 0) {
            for (let i = res.length - 1; i >= 0; i--) {
                let notified = res[i].notified;
                const id_discord = res[i].id_discord;
                let last_check = res[i].last_check;
                if (notified == 0) {
                    if (last_check !== null) {
                        botModel.selectUserWhiteList(id_discord, function (err, res) {
                            if (res.length === 0) {
                                _this.log('Avviso superamento 6 giorni di innattività <@' + id_discord + '>');
                                bot.users.get(id_discord).send(texts.getText('messaggio_exit'));
                                botModel.updateUserNotified(id_discord, function (err, res) { });
                                botModel.updateUserLastCheck(id_discord, function (err, res) { });
                            }
                        });
                    }
                }
            }
        }
    });
}

exports.cicloDiEspulsione = () => {
    botModel.selectDeadUsers(function (err, res) {
        if (res.length > 0) {
            for (let i = res.length - 1; i >= 0; i--) {
                const id_discord = res[i].id_discord;
                botModel.selectUserWhiteList(id_discord, function (err, res) {
                    if (res.length === 0) {
                        _this.log('Utente <@' + id_discord + '> in procinto di essere eliminato');
                        bot.channels.find(ch => ch.name === 'welcome').send('Oggi espello l\'utente <@' + id_discord + '> per inattività, mi dispiace ma sarà così.');
                        let guild = bot.guilds.get("532184361068527646");
                        guild.members.get(id_discord).kick();
                    }
                });
            }
        }
    });
}

exports.moderationCicle = () => {
    _this.zeroValoriNegativi();
    _this.aggiuntaTimerDiNonAttivita();
    _this.passaggioSeiGiorniPostConteggio();
    _this.cicloDiEspulsione();
}

exports.resetCountDay = () => {
    botModel.selectUsers(function (err, res) {
        //Togliere i punti o le presenze
        for (let i = res.length - 1; i >= 0; i--) {

            let id_discord = res[i].id_discord;
            let messages = res[i].messages;
            let messages_day = res[i].messages_day;

            if (messages_day == 0) {
                if (messages > 0) {
                    if (messages <= 100) {
                        botModel.updateRemoveMessageUser(id_discord, 5, function (err, res) { });
                    } else {
                        botModel.updateRemoveMessageUser(id_discord, 10, function (err, res) { });
                    }
                }
            }

            let presences = res[i].presences;
            let presence_day = res[i].presence_day;

            if (presence_day == 0) {
                if (presences > 0) {
                    if (presences <= 100) {
                        botModel.updateRemovePointUser(id_discord, 5, function (err, res) { });
                    } else {
                        botModel.updateRemovePointUser(id_discord, 10, function (err, res) { });
                    }
                }
            }
        }

        botModel.updateResetPresenceCount(function (err, res) { });

        for (let i = res.length - 1; i >= 0; i--) {
            let id_discord_getUsers = res[i].id_discord;
            let n_message_getUsers = res[i].messages;
            if (n_message_getUsers < 0) {
                botModel.updateZeroMessage(id_discord_getUsers, function (err, res) { });
            }
            let n_message_presentes = res[i].presences;
            if (n_message_presentes < 0) {
                botModel.updateZeroPresence(id_discord_getUsers, function (err, res) { });
            }
        }

        _this.log('Contatori resettati e i negativi portati a 0');
    });
}

exports.getGradoCacciatore = livel => {
    var name = "";
    if (livel >= 10 && livel < 30) {
        name = "Novizio LIV I";
    } else if (livel >= 30 && livel < 50) {
        name = "Novizio LIV II";
    } else if (livel >= 50 && livel < 100) {
        name = "Novizio LIV III";
    } else if (livel >= 100 && livel < 200) {
        name = "Apprendista LIV I";
    } else if (livel >= 200 && livel < 300) {
        name = "Apprendista LIV II";
    } else if (livel >= 300 && livel < 400) {
        name = "Apprendista LIV III";
    } else if (livel >= 400 && livel < 500) {
        name = "Felyne Lavapiatti LIV I";
    } else if (livel >= 500 && livel < 600) {
        name = "Felyne Lavapiatti LIV II";
    } else if (livel >= 600 && livel < 750) {
        name = "Felyne Lavapiatti LIV III";
    } else if (livel >= 750 && livel < 1000) {
        name = "Felyne Alchimista";
    } else if (livel >= 1000 && livel < 1250) {
        name = "Felyne Guaritore";
    } else if (livel >= 1250 && livel < 1500) {
        name = "Mercante di ossa";
    } else if (livel >= 1500 && livel < 1750) {
        name = "Mercante di spezie";
    } else if (livel >= 1750 && livel < 2000) {
        name = "Mercante di gemme";
    } else if (livel >= 2000 && livel < 2250) {
        name = "Forgiatore Novizio";
    } else if (livel >= 2250 && livel < 2500) {
        name = "Forgiatore Apprendista";
    } else if (livel >= 2500 && livel < 2750) {
        name = "Forgiatore Mastro";
    } else if (livel >= 2750 && livel < 3000) {
        name = "Assistente Incapace";
    } else if (livel >= 3000 && livel < 3250) {
        name = "Assistente Esperto";
    } else if (livel >= 3250 && livel < 3500) {
        name = "Soldato Imbranato";
    } else if (livel >= 3500 && livel < 3750) {
        name = "Soldato Spavaldo";
    } else if (livel >= 3750 && livel < 4000) {
        name = "Soldato Romantico";
    } else if (livel >= 4000 && livel < 4250) {
        name = "Soldato Elite";
    } else if (livel >= 4250 && livel < 4500) {
        name = "Amico della quinta";
    } else if (livel >= 4500 && livel < 4750) {
        name = "Baby Drago";
    } else if (livel >= 4750 && livel < 5000) {
        name = "Drago Spavaldo";
    } else if (livel >= 5000 && livel < 5250) {
        name = "Drago Imperatore";
    } else if (livel >= 5250 && livel < 5500) {
        name = "Spacca Draghi";
    } else if (livel >= 5500 && livel < 5750) {
        name = "Sterminatore di draghi";
    } else if (livel >= 5750) {
        name = "Stella di zaffiro";
    }
    return name;
};
exports.censure = str => {
    var lista_bestemmie = ["dio cane", "diocane", "porcodio", "porco dio"];
    var arrayLength = lista_bestemmie.length;
    var status = 0;
    for (var i = 0; i < arrayLength; i++) {
        var pattern = new RegExp(lista_bestemmie[i], 'i');
        if (pattern.test(str)) {
            status += 1;
        }
    }
    if (status >= 1) {
        return true;
    } else {
        return false;
    }
};
exports.getRispose = () => {
    let id = Math.floor(Math.random() * 20) + 1;
    if (id == 1) {
        return "Per quanto posso vedere, sì";
    } else if (id == 2) {
        return "È certo";
    } else if (id == 3) {
        return "È decisamente così";
    } else if (id == 4) {
        return "Molto probabilmente";
    } else if (id == 5) {
        return "Le prospettive sono buone";
    } else if (id == 6) {
        return "Le mie fonti indicano di sì";
    } else if (id == 7) {
        return "Senza alcun dubbio";
    } else if (id == 8) {
        return "Sì";
    } else if (id == 9) {
        return "Sì, senza dubbio";
    } else if (id == 10) {
        return "Ci puoi contare";
    } else if (id == 11) {
        return "È difficile rispondere, prova di nuovo";
    } else if (id == 12) {
        return "Rifai la domanda più tardi";
    } else if (id == 13) {
        return "Meglio non risponderti adesso";
    } else if (id == 14) {
        return "Non posso predirlo ora";
    } else if (id == 15) {
        return "Concentrati e rifai la domanda";
    } else if (id == 16) {
        return "Non ci contare";
    } else if (id == 17) {
        return "La mia risposta è no";
    } else if (id == 18) {
        return "Le mie fonti dicono di no";
    } else if (id == 19) {
        return "Le prospettive non sono buone";
    } else if (id == 20) {
        return "Molto incerto";
    } else {
        return "Mi puoi rifare la domanda, non ho capito..";
    }
};
exports.generaMessaggioSelezionaGioco = () => {
    var messages = [];

    initialMessage = texts.getText('role_title');
    subMessage = texts.getText('role_subtitle');

    if (initialMessage) {
        role_title = initialMessage;
    } else {
        role_title = 'Titolo non settato';
    }

    if (subMessage) {
        role_subtitle = subMessage;
    } else {
        role_subtitle = 'Sottotitoli non settati';
    }

    messages.push(role_title);
    role = botCache.selectCacheRole('role'); //Questa funziona è da cambiare

    if (role.length > 0) {
        for (var i = role.length - 1; i >= 0; i--) {
            value = role[i];
            messages.push(`"${role_subtitle}": **"${value}"**!`);
        }
    } else {
        messages.push(`"${role_subtitle}": ** Nessun ruolo inserito **!`);
    }
    return messages;
};

exports.generaMessaggioSelezionaGiocoSmall = function(emoji){
    var messages = [];

    initialMessage = texts.getText('role_title_small');
    subMessage_1 = texts.getText('role_subtitle_small_1');
    subMessage_2 = texts.getText('role_subtitle_small_2');

    if (initialMessage) {
        role_title = initialMessage;
    } else {
        role_title = 'Titolo non settato';
    }
    messages.push(role_title);
    role = botCache.selectCacheRole('role'); // Questa funzine è da cambiare.
    if (role.length > 0) {
        for (var i = role.length - 1; i >= 0; i--) {
            value = role[i];
            messages.push(`${emoji[i]} = **"${value}"**`);
        }
    }
    return messages;
}

exports.getServiceMessage = function () {
    let message = botCache.selectCacheText('message_service');
    let embed = new Discord.RichEmbed()
        .setTitle('Messaggio di servizio! :nerd: ')
        .setColor('RANDOM')
        .setDescription(message);
    const b = [
        "4-chiacchiere",
        "black-desert",
        "borderlands-2",
        "borderlands-3",
        "diablo-3",
        "path-of-exile",
        "ghost-wildlands",
        "ghost-breakpoint",
        "mhw",
        "the-division"
    ];
    let c = bot.channels.array();
    //console.log(c);
    for (let i = 0; i < c.length; i++) {
        const n = c[i].name;
        const t = c[i].type;
        if (t == 'text') {
            var it = _this.checkdata(n, b); 
            if (it == true) {
                bot.channels.find(ch => ch.name === n).send({ embed })
                    .then()
                    .catch();
            } 
        }    
    }
}

exports.checkdata = function(string, array){
    var x = 0;
    for (let i = 0; i < array.length; i++) {
        const erif = array[i];
        //console.log(erif);
        if (string == erif) {
            x++;
        }
    }

    if (x > 0) {
        return true;
    } else {
        return false;
    }
}

exports.sleep = function(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

exports.settingsLivel = function(message_in, bot_in, livels) {

    const args = message_in.content.slice(bot_in.conf.prefix.length).trim().split(/ +/g);
    const string = args.slice(2).join(' ');
    
    if (!message_in.member.roles.some(r => ["Admin", "Developer"].includes(r.name)))
      return message_in.reply(texts.getText('message_error_authorization'));

    if (!args[1]) {
      return message_in.reply(texts.getText('command_settins_error_id'));
    }
    if (!string) {
      return message_in.reply(texts.getText('message_error_value'));
    }
}