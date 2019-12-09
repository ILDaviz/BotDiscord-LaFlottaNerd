'user strict';

const botModel = require('./models');
const estractor = require('./json');
const Discord = require('discord.js');
const bot = require('../bot.js');

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

exports.log = function (note, color = 'RANDOM') {
    let embed = new Discord.RichEmbed()
        .setColor(color)
        .setDescription(note)
    bot.channels.get(bot.conf.chanel_log).send({ embed });
}

exports.utenteSuperamentoLivello = async function (message) {
    botModel.selectUser(message.author.id, function (err, res) {
        if (res.length > 0) {
            const n_messages = res.map(a => a.messages);
            if (_this.users_update(n_messages)) {
                let result = _this.getGradoCacciatore(n_messages);
                bot.channels.get(message.channel.id).send("Ciao <@" + message.author.id + ">! Hai raggiunto un nuovo rango all'interno della nostra gilda:** " + result + " **");
            }
        }
    });
}

exports.users_update = function (message) {
    let p = 0;
    gaps = [10,30,50,100,200,300,400,500,600,750,1000,1250,1500,1750,2000,2250,2500,2750,3000,3250,3500,3750,4000,4250,4500,4750,5000,5250,5500,5750];
    gaps.forEach( e => {
        if (e == message) {
            p++;
        }
    });

    if (p > 0) {
        return true;
    } else {
        return false;
    }
}

exports.getGradoCacciatore = livel => {
    var name = "";
    if (livel >= 10 && livel < 30) {
        name = estractor.getRanke('ranks_1');
    } else if (livel >= 30 && livel < 50) {
        name = estractor.getRanke('ranks_2');
    } else if (livel >= 50 && livel < 100) {
        name = estractor.getRanke('ranks_3');
    } else if (livel >= 100 && livel < 200) {
        name = estractor.getRanke('ranks_4');
    } else if (livel >= 200 && livel < 300) {
        name = estractor.getRanke('ranks_5');
    } else if (livel >= 300 && livel < 400) {
        name = estractor.getRanke('ranks_6');
    } else if (livel >= 400 && livel < 500) {
        name = estractor.getRanke('ranks_7');
    } else if (livel >= 500 && livel < 600) {
        name = estractor.getRanke('ranks_8');
    } else if (livel >= 600 && livel < 750) {
        name = estractor.getRanke('ranks_9');
    } else if (livel >= 750 && livel < 1000) {
        name = estractor.getRanke('ranks_10');
    } else if (livel >= 1000 && livel < 1250) {
        name = estractor.getRanke('ranks_11');
    } else if (livel >= 1250 && livel < 1500) {
        name = estractor.getRanke('ranks_12');
    } else if (livel >= 1500 && livel < 1750) {
        name = estractor.getRanke('ranks_13');
    } else if (livel >= 1750 && livel < 2000) {
        name = estractor.getRanke('ranks_14');
    } else if (livel >= 2000 && livel < 2250) {
        name = estractor.getRanke('ranks_15');
    } else if (livel >= 2250 && livel < 2500) {
        name = estractor.getRanke('ranks_16');
    } else if (livel >= 2500 && livel < 2750) {
        name = estractor.getRanke('ranks_17');
    } else if (livel >= 2750 && livel < 3000) {
        name = estractor.getRanke('ranks_18');
    } else if (livel >= 3000 && livel < 3250) {
        name = estractor.getRanke('ranks_19');
    } else if (livel >= 3250 && livel < 3500) {
        name = estractor.getRanke('ranks_20');
    } else if (livel >= 3500 && livel < 3750) {
        name = estractor.getRanke('ranks_21');
    } else if (livel >= 3750 && livel < 4000) {
        name = estractor.getRanke('ranks_22');
    } else if (livel >= 4000 && livel < 4250) {
        name = estractor.getRanke('ranks_23');
    } else if (livel >= 4250 && livel < 4500) {
        name = estractor.getRanke('ranks_24');
    } else if (livel >= 4500 && livel < 4750) {
        name = estractor.getRanke('ranks_25');
    } else if (livel >= 4750 && livel < 5000) {
        name = estractor.getRanke('ranks_26');
    } else if (livel >= 5000 && livel < 5250) {
        name = estractor.getRanke('ranks_27');
    } else if (livel >= 5250 && livel < 5500) {
        name = estractor.getRanke('ranks_28');
    } else if (livel >= 5500 && livel < 5750) {
        name = estractor.getRanke('ranks_29');
    } else if (livel >= 5750) {
        name = estractor.getRanke('ranks_30');
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

exports.checkdata = function (string, array) {
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

/** Crea un periodo di pausa */
exports.sleep = function (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
