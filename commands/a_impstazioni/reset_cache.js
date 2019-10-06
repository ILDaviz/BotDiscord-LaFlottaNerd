const botCache = require('../../helpers/Cache');

exports.run = async (message, bot) => {
  	botCache.resetCache();
    message.channel.send('reset completato');
};

exports.conf = {
    name: "Reset_Cache",
    fullcmd: "reset_cache",
    alias: "rcache",
    description: "Resetta la cache del bot dopo qualsiasi modifica bisogna dare questo comando",
    timer: 0,
    tokenCost: 0,
    subClass: 'impostazioni',
    displayHelp: 1
};