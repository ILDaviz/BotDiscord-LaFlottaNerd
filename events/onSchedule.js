const schedule = require('node-schedule');
const bot = require('../bot.js');
const botModel = require('../helpers/Models');
const botCache = require('../helpers/Cache');
const botUtil = require('../helpers/Util')

schedule.scheduleJob('0 2 * * *', function () {
    botUtil.moderationCicle();
});

schedule.scheduleJob('0 9 * * *', function () {
  getServiceMessage();
});
schedule.scheduleJob('0 13 * * *', function () {
  getServiceMessage();
});
schedule.scheduleJob('0 17 * * *', function () {
  getServiceMessage();
});
schedule.scheduleJob('0 21 * * *', function () {
  getServiceMessage();
});