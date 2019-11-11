const botUtil = require('../helpers/Util');
const CronJob = require('cron').CronJob;
//Cron ciclo di espulsioni
new CronJob('0 0 2 * * *', function () {
  botUtil.log('Avvio processo di espulsione');
  botUtil.moderationCicle();
}, null, true, "Europe/Rome");
// new CronJob('0 0 11 * * *', function () {
//   botUtil.log('Messaggio di servizio inviato');
//   botUtil.getServiceMessage();
// }, null, true, "Europoe/Rome");
// new CronJob('0 0 17 * * *', function () {
//   botUtil.log('Messaggio di servizio inviato');
//   botUtil.getServiceMessage();
// }, null, true, "Europoe/Rome");
// new CronJob('0 0 23 * * *', function () {
//   botUtil.log('Messaggio di servizio inviato');
//   botUtil.getServiceMessage();
// }, null, true, "Europoe/Rome");
