const botUtil = require('../helpers/Util');
const CronJob = require('cron').CronJob;

//Cron ciclo di espulsioni
new CronJob('0 0 2 * * *', function () {
  botUtil.log('Avvio processo di espulsione');
  botUtil.moderationCicle();
}, null, true, "Europe/Rome");
