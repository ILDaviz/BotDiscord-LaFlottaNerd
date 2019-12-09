const texts = require("../../helpers/json");

exports.run = async (message, bot) => {

    let messages = [];
    //Inizializza il messaggio di ben
    initialMessage = texts.getText('role_title_small');
    messages.push(initialMessage);
    //Crea la lista ruoli
    var roles = texts.getSetting('role_selector');
    if (roles.length > 0) {
        for (var i = roles.length - 1; i >= 0; i--) {
            value = roles[i].role;
            emoji = roles[i].emoji;
            messages.push(`${emoji} = **"${value}"**`);
        }
    }
    //Stampa le emoji per la selezzione del ruolo.
    message.channel.send(messages)
        .then(function (message) {
            for (var i = roles.length - 1; i >= 0; i--) {
                message.react(roles[i].emoji);
            }
        }).catch(function () { });
};

exports.conf = {
    name: "Seleziona_gioco",
    fullcmd: "seleziona_gioco",
    alias: "sgame",
    description: texts.getText("command_s_home_seleziona_gioco_description"),
    timer: 0,
    tokenCost: 0,
    subClass: 'start',
    displayHelp: 1
};