const texts = require("../../helpers/Json");
const reactions = "👍";

exports.run = async (message, bot) => {

    var messages = [];

    initialMessage = texts.getText('role_title');
    subMessage = texts.getText('role_subtitle');

    if (initialMessage) {
        role_title = initialMessage;
    } else {
        role_title = 'Titolo non settato';
    }

    if (subMessage) {
        role_subtitle = subMessage;
    } else {
        role_subtitle = 'Sottotitoli non settati';
    }

    messages.push(role_title);
    role = texts.getSetting('role_selector');
    if (role.length > 0) {
        for (var i = role.length - 1; i >= 0; i--) {
            value = role[i].role;
            messages.push(`"${role_subtitle}": **"${value}"**!`);
        }
    } else {
        messages.push(`"${role_subtitle}": ** Nessun ruolo inserito **!`);
    }

    let mappedArray = [[messages[0], false], ...messages.slice(1).map((message, idx) => [message, reactions])];
    for (let mapObj of mappedArray) {
        message.channel.send(mapObj[0]).then(sent => {
            if (mapObj[1]) {
                sent.react(mapObj[1]);
            }
        });
    }
};

exports.conf = {
    name: "Stampa_seleziona_giochi",
    fullcmd: "stampa_seleziona_giochi",
    alias: "ssgame",
    description: texts.getText("command_utility_stampa_seleziona_giochi_description"),
    timer: 0,
    tokenCost: 0,
    subClass: 'utility_staff',
    displayHelp: 1
};