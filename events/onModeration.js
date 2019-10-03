const schedule = require('node-schedule');

schedule.scheduleJob('0 2 * * *', function () {
    scriptBanUsers();
    resetCountDay();
  });