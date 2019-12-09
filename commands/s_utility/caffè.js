
exports.run = async (message, bot) => {

  let id_author = message.author.id;

  if (message.mentions.members.first()) {
    let id_mention = message.mentions.members.first().id;
    message.channel.send("Ciao <@" + id_mention + "> sei fortunato, l'utente <@" + id_author + "> ti ha offerto un :coffee:");
  } else {
    message.channel.send("Ciao <@" + id_author + "> eccoti un buon :coffee:");
  }
};

exports.conf = {
  name: "Caffè",
  fullcmd: "caffè",
  alias: "caffe",
  description: "Offri un caffè a qualcuno o altrimenti te lo offro io :yum:",
  timer: 0,
  tokenCost: 0,
  subClass: 's_utility',
  displayHelp: 1
};