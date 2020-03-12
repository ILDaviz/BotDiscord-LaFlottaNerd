'user strict';

/**
 * Ciclo di espulsione.
 */

const botUtil = require('./util');
const botModel = require('./models');
const estractor = require('./json');
const Discord = require('discord.js');
const bot = require('../bot.js');

var _this = this;

/**
 * Riporta a 0 i valori negativi nel database.
 */
exports.zeroValoriNegativi = () => {
    botUtil.log('Avvio processo per eliminare i punteggi sotto lo 0', 'F8E71C');
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
/**
 * Aggiunge il timer agli utenti che non sono attivi da tot.
 */
exports.aggiuntaTimerDiNonAttivita = () => {
    botUtil.log('Avvio processo per l\'assegnazione di non attività', 'F8E71C');
    let guilds = bot.guilds.array();
    for (let i = 0; i < guilds.length; i++) {
        bot.guilds.get(guilds[i].id).fetchMembers().then(guild => {
            guild.members.array().forEach(r => {
                const id_discord = r.user.id;
                //Controlla se è presente in lista bianca
                botModel.selectUserWhiteList(id_discord, function (err, res) {
                    if (res.length === 0) {
                        botModel.selectUser(id_discord, function (err, res) {
                            if (res.length > 0) {
                                let presences = res[0].presences;
                                let last_check = res[0].last_check;
                                if (presences == 0) {
                                    //Controlla l'ultimo check se non settato lo setta!
                                    if (last_check == null) {
                                        //Aggiungi la data del check
                                        botUtil.log('Aggiunto timer all\'utente <@' + id_discord + '>', 'F8E71C');
                                        botModel.updateUserLastCheck(id_discord, function (err, res) { });
                                    }
                                } else {
                                    //Resetta il clock
                                    if (last_check !== null) {
                                        botUtil.log('Tolto timer all\'utente <@' + id_discord + '>', 'F8E71C');
                                        botModel.updateUserLastCheck(id_discord, function (err, res) { });
                                    }
                                }
                            }
                        });
                    }
                });
            });
        });
    }
}
/**
 * Invia il messaggio
 */
exports.passaggioSeiGiorniPostConteggio = () => {
    botUtil.log('Avvio processo per l\'invio del messaggio privato di non attività', 'F8E71C');
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
                                botUtil.log('Avviso superamento 6 giorni di innattività <@' + id_discord + '>', 'F8E71C');
                                let guilds = bot.guilds.array();
                                for (let i = 0; i < guilds.length; i++) {
                                    bot.guilds.get(guilds[i].id).fetchMembers().then(guild => {
                                        guild.members.get(id_discord).send(estractor.getText('messaggio_exit'));
                                    });
                                }
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
/**
 * Elimina utenti
 */
exports.cicloDiEspulsione = () => {
    botUtil.log('Avvio processo per l\'espulsione degli utenti non attivi', 'F8E71C');
    botModel.selectDeadUsers(function (err, res) {
        if (res.length > 0) {
            for (let i = res.length - 1; i >= 0; i--) {
                const id_discord = res[i].id_discord;
                botModel.selectUserWhiteList(id_discord, function (err, res) {
                    if (res.length === 0) {
                        botUtil.log('Utente <@' + id_discord + '> in procinto di essere eliminato', 'F8E71C');
                        let guilds = bot.guilds.array();
                        for (let i = 0; i < guilds.length; i++) {
                            bot.guilds.get(guilds[i].id).fetchMembers().then(guild => { 
                                guild.members.get(id_discord).kick();
                                botModel.deleteUser(id_discord, function (err, res) {});
                            });
                        }
                    }
                });
            }
        }
    });
}
/**
 * Resetta i contatori dei messaggi
 */
exports.resetCountDay = () => {
    botUtil.log('Avvio processo per il reset dei contatori giornalieri', 'F8E71C');
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
    });
}

exports.moderationCicle = () => {
    _this.zeroValoriNegativi();
    _this.aggiuntaTimerDiNonAttivita();
    _this.passaggioSeiGiorniPostConteggio();
    _this.cicloDiEspulsione();
    _this.resetCountDay();
}