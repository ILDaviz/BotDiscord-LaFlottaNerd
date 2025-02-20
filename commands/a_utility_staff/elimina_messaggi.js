const texts = require("../../helpers/json");

exports.run = async (message, bot) => {

    if (!message.member.roles.some(r => ["Admin", "Moderatori", "Developer"].includes(r.name)))
        return message.reply("Mi dispiace, ma non hai le autorizzazioni per usare questo comando.");

    const user = message.mentions.users.first();
    // Parse Amount
    const amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2])
    if (!amount) return message.reply('Devi specificare un numero di messaggi da eliminare!');
    if (!amount && !user) return message.reply('Devi specificare un utente e una quantità, o solo una quantità, di messaggi da eliminare!');
    // Fetch 100 messages (will be filtered and lowered up to max amount requested)
    message.channel.fetchMessages({
        limit: 100,
    }).then((messages) => {
        if (user) {
            const filterBy = user ? user.id : Client.user.id;
            messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
        }
        message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
    });
};

exports.conf = {
    name: "Elimina_messaggi",
    fullcmd: "elimina_messaggi",
    alias: "elimina",
    description: texts.getText('command_utility_elimina_messaggio_description'),
    timer: 0,
    tokenCost: 0,
    subClass: 'utility_staff',
    displayHelp: 1
};