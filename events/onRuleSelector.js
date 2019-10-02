const bot = require('../bot.js');
const botModel = require('../helpers/Models');
const util = require('../helpers/Util')

bot.on('raw', event => {
    if (event.t === 'MESSAGE_REACTION_ADD' || event.t == "MESSAGE_REACTION_REMOVE") {
        let channel = bot.channels.get(event.d.channel_id);
        channel.fetchMessage(event.d.message_id).then(msg => {
            const user = msg.guild.members.get(event.d.user_id);
            botModel.selectSettingFromName('role_title',function(err,res){
                if (res.length > 0) {
                    var role_title = unescape(res.value);
                } else {
                    var role_title = 'Titolo non settato';
                }
                
                if (msg.author.id == bot.conf.id_bot && msg.content != role_title) {

                    var re = `\\*\\*"(.+)?(?="\\*\\*)`;
                    var role = msg.content.match(re)[1];
                    if (user.id != bot.conf.id_bot) {
                        var roleObj = msg.guild.roles.find(r => r.name === role);
                        console.log(roleObj);
                        var memberObj = msg.guild.members.get(user.id);
                        console.log(memberObj);
                        if (event.t === "MESSAGE_REACTION_ADD") {
                            memberObj.addRole(roleObj)
                        } else {
                            memberObj.removeRole(roleObj);
                        }
                    }
                }
            });
        });
    }
});