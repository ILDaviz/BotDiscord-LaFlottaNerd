
exports.run = async (message, bot) => {
  message.channel.send(":kissing_heart:");
};

exports.conf = {
  name: "Bacio",
  fullcmd: "bacio",
  alias: "kiss",
  description: "Ti do un bacino..",
  timer: 0,
  tokenCost: 0,
  subClass: 's_utility',
  displayHelp: 1
};