
exports.run = async (message, bot) => {

  let id_author = message.member.id;

  if (message.mentions.members.first()) {
    let id_mention = message.mentions.members.first().id;
    message.channel.send("Ciao <@" + id_mention + "> sei fortunato, l'utente <@" + id_author + "> ti ha offerto un :wine_glass: di vino");
  } else {
    message.channel.send("Ciao <@" + id_author + "> eccoti un buon :wine_glass: di vino");
  }
};

exports.conf = {
    name: "Vino",
    fullcmd: "vino",
    alias: "vin",
    description: "Offri un bicchiere di vino a qualcuno o altrimenti te lo offro io :yum:",
    timer: 0,
    tokenCost: 0,
    subClass: 's_utility',
    displayHelp: 1
};