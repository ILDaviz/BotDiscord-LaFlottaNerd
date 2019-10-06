const botUtil = require('../helpers/Util');
const CronJob = require('cron').CronJob;
//Cron ciclo di espulsioni
new CronJob('0 2 * * * *', function () {
  botUtil.moderationCicle();
}, null, true);
new CronJob('0 13 * * * *', function () {
  botUtil.getServiceMessage();
}, null, true);
new CronJob('0 17 * * * *', function () {
  botUtil.getServiceMessage();
}, null, true);
new CronJob('0 21 * * * *', function () {
  botUtil.getServiceMessage();
}, null, true);