const bot = require('../bot.js');
const botCache = require('../helpers/Cache');
const arole = require('../commands/seleziona_gioco'); 

bot.on('raw', event => {
    if (event.t === 'MESSAGE_REACTION_ADD' || event.t == "MESSAGE_REACTION_REMOVE") {
        let channel = bot.channels.get(event.d.channel_id);
        channel.fetchMessage(event.d.message_id).then(msg => {
            //Metodo via comando
            const user = msg.guild.members.get(event.d.user_id);
            var title = botCache.selectCacheText('role_title_small');
            if (title) {
                var role_title = title;
            } else {
                var role_title = 'Titolo non settato';
            }
            var buf = Buffer.from(msg.content);
            var inbuf = buf.includes(role_title);
            var namemoji = event.d.emoji.name;
            if (msg.author.id == bot.conf.id_bot) {
                if (inbuf) {
                    if (user.id != bot.conf.id_bot) {
                        var array_arole = arole.a_role();
                        for (let i = 0; i < array_arole.length; i++) {
                            const emoji = array_arole[i].emoji;
                            const role = array_arole[i].role;
                            if (emoji === namemoji) {
                                var memberObj = msg.guild.members.get(user.id);
                                var roleObj = msg.guild.roles.find(r => r.name === role);
                                if (event.t === "MESSAGE_REACTION_ADD") {
                                    memberObj.addRole(roleObj)
                                } else {
                                    memberObj.removeRole(roleObj);
                                }
                            }
                        }
                    }
                }
            }
            //Metodo via comando
            if (msg.author.id == bot.conf.id_bot) {
                if (msg.channel.name == 'welcome') {
                    if (user.id != bot.conf.id_bot) {
                        var array_arole = arole.a_role();
                        for (let i = 0; i < array_arole.length; i++) {
                            const emoji = array_arole[i].emoji;
                            const role = array_arole[i].role;
                            if (emoji === namemoji) {
                                var memberObj = msg.guild.members.get(user.id);
                                var roleObj = msg.guild.roles.find(r => r.name === role);
                                if (event.t === "MESSAGE_REACTION_ADD") {
                                    memberObj.addRole(roleObj)
                                } else {
                                    memberObj.removeRole(roleObj);
                                }
                            }
                        }
                    }
                }
            }
            //Metodo via pagina
            var title = botCache.selectCacheText('role_subtitle');
            if (title) {
                var role_title = title;
            } else {
                var role_title = 'Titolo non settato';
            }

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
                        } else {
                            memberObj.removeRole(roleObj);
                        }
                    }
                }
            }
        });
    }
});