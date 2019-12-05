const bot = require('../bot.js');
const botUtil = require('../helpers/Util');
const texts = require("../helpers/Json");

bot.on('raw', event => {
    if (event.t === 'MESSAGE_REACTION_ADD' || event.t == "MESSAGE_REACTION_REMOVE") {
        let channel = bot.channels.get(event.d.channel_id);
        channel.fetchMessage(event.d.message_id).then(msg => {
            //Metodo via comando
            const user = msg.guild.members.get(event.d.user_id);
            var role_title = texts.getText('role_title_small');
            var buf = Buffer.from(msg.content);
            var inbuf = buf.includes(role_title);
            var namemoji = event.d.emoji.name;
            if (msg.author.id == bot.conf.id_bot) {
                if (inbuf) {
                    if (user.id != bot.conf.id_bot) {
                        var array_arole = texts.getSetting('role_selector');
                        for (let i = 0; i < array_arole.length; i++) {
                            const emoji = array_arole[i].emoji;
                            const role = array_arole[i].role;
                            if (emoji === namemoji) {
                                var memberObj = msg.guild.members.get(user.id);
                                var roleObj = msg.guild.roles.find(r => r.name === role);
                                if (event.t === "MESSAGE_REACTION_ADD") {
                                    memberObj.addRole(roleObj)
                                    botUtil.log('Utente <@' + user.id + '> è entrante nel ruolo: ' + role + '. (via comando)');
                                } else {
                                    memberObj.removeRole(roleObj);
                                    botUtil.log('Utente <@' + user.id + '> è uscito nel ruolo: ' + role + '. (via comando)');
                                }
                            }
                        }
                    }
                }
            }
            //Metodo via comando welcome page
            if (msg.author.id == bot.conf.id_bot) {
                if (msg.channel.name == 'welcome') {
                    if (user.id != bot.conf.id_bot) {
                        var array_arole = texts.getSetting('role_selector');
                        for (let i = 0; i < array_arole.length; i++) {
                            const emoji = array_arole[i].emoji;
                            const role = array_arole[i].role;
                            if (emoji === namemoji) {
                                var memberObj = msg.guild.members.get(user.id);
                                var roleObj = msg.guild.roles.find(r => r.name === role);
                                if (event.t === "MESSAGE_REACTION_ADD") {
                                    memberObj.addRole(roleObj)
                                    botUtil.log('Utente <@' + user.id + '> è entrante nel ruolo: ' + role + '. (via comando)');
                                } else {
                                    memberObj.removeRole(roleObj);
                                    botUtil.log('Utente <@' + user.id + '> è uscito nel ruolo: ' + role + '. (via comando)');
                                }
                            }
                        }
                    }
                }
            }
            //Metodo via pagina
            var role_title = texts.getText('role_subtitle');
            var buf = Buffer.from(msg.content);
            var inbuf = buf.includes(role_title);

            if (msg.author.id == bot.conf.id_bot) {
                if (inbuf) {
                    var re = `\\*\\*"(.+)?(?="\\*\\*)`;
                    var role = msg.content.match(re)[1];
                    if (user.id != bot.conf.id_bot) {
                        var roleObj = msg.guild.roles.find(r => r.name === role);
                        var memberObj = msg.guild.members.get(user.id);
                        if (event.t === "MESSAGE_REACTION_ADD") {
                            memberObj.addRole(roleObj)
                            botUtil.log('Utente <@' + user.id + '> è entrante nel ruolo: ' + role + '. (via canale)');
                        } else {
                            memberObj.removeRole(roleObj);
                            botUtil.log('Utente <@' + user.id + '> è uscito nel ruolo: ' + role + '. (via canale)');
                        }
                    }
                }
            }
        });
    }
});