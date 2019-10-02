let cmds = require('../helpers/loadcommands').cmdDetail;
let Discord = require('discord.js');

exports.run = async (message, bot) => {

    let emb = new Discord.RichEmbed()
    .setTitle(`Ecco come fare..`)
        .setDescription("Crea un soprannome composto in questo modo: prima scrivi il tuo ID-PSN, seguito dal nome reale (non quello in-game) tra parentesi, ad esempio: Lupercalex (Alessio), Griselbrand85 (Simone), in modo da riconoscerci facilmente durante le sessioni di gioco. Per cambiare il nickname usa questo comando")
        .addField("**^nick [qui scrivi il tuo nuovo soprannome]**","Le parentesi quadrate non servono. es. ^nick Griselbrand85 (Simone)");    
    message.channel.send(emb);
};

exports.conf = {
    name: "Cambia_nickname",
    fullcmd: "cambia_nickname",
    alias: "canick",
    description: "Cambia il tuo Nickname nel modo corretto con questo comando",
    timer: 0,
    tokenCost: 10,
    subClass: 'start',
    displayHelp: 1
};