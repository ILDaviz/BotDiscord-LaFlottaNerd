const botModel = require('../../helpers/Models');
const botUtil = require('../../helpers/Util');

exports.run = async (message, bot) => {
    botUtil.moderationCicle();
};

exports.conf = {
    name: "Espulsione_manuale",
    fullcmd: "espulsione_manuale",
    alias: "raid",
    description: "Avvia il processo di ban manualmente",
    timer: 0,
    tokenCost: 0,
    subClass: 'help_moderazione',
    displayHelp: 1
};