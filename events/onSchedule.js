'user strict';

const botUtil = require('../helpers/util');
const botEspulsione = require('../helpers/espulsioni');
const CronJob = require('cron').CronJob;

//Cron ciclo di espulsioni
new CronJob('0 0 2 * * *', function () {
  botUtil.log('Avvio processo di espulsione');
  botEspulsione.moderationCicle();
}, null, true, "Europe/Rome");
