const Discord  = require('discord.js');
const botModel = require('../helpers/Models');
const botUtili = require('../helpers/Util');
const botCache = require('../helpers/Cache');
const reactions = "👍";

exports.run = async (message, bot) => {    
    var toSend = botUtili.generaMessaggioSelezionaGioco();
    let mappedArray = [[toSend[0], false], ...toSend.slice(1).map( (message, idx) => [message, reactions])];
    for (let mapObj of mappedArray){
        message.channel.send(mapObj[0]).then( sent => {
            if (mapObj[1]){
                sent.react(mapObj[1]);  
            } 
        });
    }
};

exports.conf = {
    name: "Stampa_seleziona_giochi",
    fullcmd: "stampa_seleziona_giochi",
    alias: "ssgame",
    description: "Comando per stampare la lista giochi (vecchia versione)",
    timer: 0,
    tokenCost: 0,
    subClass: 'utility_staff',
    displayHelp: 1
};