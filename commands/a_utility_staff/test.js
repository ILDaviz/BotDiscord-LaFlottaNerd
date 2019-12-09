
const botUtili = require('../../helpers/espulsioni');

exports.run = async (message, bot) => {
  if (!message.member.roles.some(r => ["Admin", "Developer"].includes(r.name)))
    return message.reply("Mi dispiace, ma non hai le autorizzazioni per usare questo comando.");
  botUtili.moderationCicle();
};

exports.conf = {
    name: "Test",
    fullcmd: "test",
    alias: "test",
    description: "",
    timer: 0,
    tokenCost: 0,
    subClass: 'utility_staff',
    displayHelp: 0
};