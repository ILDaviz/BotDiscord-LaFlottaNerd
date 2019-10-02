const Discord  = require('discord.js');
const botModel = require('../helpers/Models');
const botUtili = require('../helpers/Util');
const botCache = require('../helpers/Cache');
const reactions = "👍";

exports.run = async (message, bot) => {    
    var toSend = botUtili.generateMessages();
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
    name: "Seleziona_gioco",
    fullcmd: "seleziona_gioco",
    alias: "sgame",
    description: ":bangbang: **importante!** Usa questo comando per avere la lista dei giochi disponibili, poi segui le istruzzioni indicate per entrare nel canale dedicato",
    timer: 0,
    tokenCost: 0,
    subClass: 'start',
    displayHelp: 1
};