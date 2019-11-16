const botCache = require('../../helpers/Cache');
const texts = require("../../helpers/Texts");

exports.run = async (message, bot) => {
    botCache.resetCache(function(err){
        if (err) {
            message.channel.send('errore di reset cache' + err );
        }
        message.channel.send('Cache resettata con successo');
    });
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