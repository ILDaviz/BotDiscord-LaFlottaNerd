const Discord  = require('discord.js');
const botModel = require('../helpers/Models');
const botUtili = require('../helpers/Util');
const botCache = require('../helpers/Cache');

exports.run = async (message, bot) => {
    if (!message.member.roles.some(r => ["Admin", "Moderatori", "Developer"].includes(r.name)))
      return message.reply("Mi dispiace, non hai i permessi per inviare questo comando");
    const m = await message.channel.send("Attendi..");
    botUtili.cleenDatabase();
    m.edit("Processo completato.");
};

exports.conf = {
    name: "Pulisci_database",
    fullcmd: "pulisci_database",
    alias: "cleendb",
    description: "Pulizia forzata database, elimina gli utenti che non sono più presenti in gilda",
    timer: 0,
    tokenCost: 0,
    subClass: 'help_moderazione',
    displayHelp: 1
};