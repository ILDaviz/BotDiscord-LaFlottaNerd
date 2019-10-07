
exports.run = async (message, bot) => {
  message.channel.send("Ecco il link per invitare un utente in quest gilda : https://discord.gg/2FaG9kE");
};

exports.conf = {
    name: "Invito",
    fullcmd: "invito",
    alias: "inv",
    description: "Ti creo un link per invitare una persona nella gilda se ti serve.",
    timer: 0,
    tokenCost: 0,
    subClass: 'help_utility',
    displayHelp: 1
};