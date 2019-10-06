// const bot = require('../bot.js');
// const botModel = require('../helpers/Models');
// const util = require('../helpers/Util')

// bot.on('raw', event => {
//     if (event.t === 'MESSAGE_CREATE') {
//         const id_user = event.d.author.id;
//         let mentions = event.d.mentions;
//         let id_channel = event.d.channel_id;        
//         for (let index = 0; index < mentions.length; index++) {
//             let id_mention = mentions[index].id;
//             if (id_mention == bot.conf.id_bot) {
//                 botModel.selectMentionBot(id_user, function (err, mentions) {
//                     if (mentions == 0) {
//                         bot.channels.get(id_channel).send('<@' + id_user + '> Sai che sono un Bot e non posso risponderti, per piacere non menzionarmi :D');
//                     } else if (mentions == 1) {
//                         bot.channels.get(id_channel).send('<@' + id_user + '> Per piacere smettila!');
//                     } else if (mentions == 2) {
//                         bot.channels.get(id_channel).send('Hei!<@' + id_user + '> Ho detto di smetterla!!!!!!!');
//                     } else if (mentions == 3) {
//                         bot.channels.get(id_channel).send('<@' + id_user + '> BASTAAAAAAAA!!!!!!!!!!!!!!!!!!!!!!');
//                     } else if (mentions == 4) {
//                         bot.channels.get(id_channel).send('https://media1.tenor.com/images/da022ba3792e2486459abf1dc53864ec/tenor.gif?itemid=5641362');
//                     } else if (mentions == 7) {
//                         bot.channels.get(id_channel).send('https://tenor.com/view/cant-hear-you-jim-carrey-gif-11229249');
//                     } else if (mentions == 9) {
//                         bot.channels.get(id_channel).send('https://tenor.com/view/brave-merida-no-listen-ginger-gif-5528367');
//                     } else {
//                         bot.channels.get(id_channel).send('<@' + id_user + '> Non ti parlo più...');
//                     }
//                 });
//             }
//             botModel.updateMentionBot(id_user, function (err, res) { });
//         }
//     }
// });