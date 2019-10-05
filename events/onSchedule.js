const schedule = require('node-schedule');
const botUtil = require('../helpers/Util')

schedule.scheduleJob('0 2 * * *', function () {
    botUtil.moderationCicle();
});
schedule.scheduleJob('0 9 * * *', function () {
  botUtil.getServiceMessage();
});
schedule.scheduleJob('0 13 * * *', function () {
  botUtil.getServiceMessage();
});
schedule.scheduleJob('0 17 * * *', function () {
  botUtil.getServiceMessage();
});
schedule.scheduleJob('0 21 * * *', function () {
  botUtil.getServiceMessage();
});