const Discord = require('discord.js');

exports.run = async (message, bot) => {
  let risposta = getRispose();
  let embed = new Discord.RichEmbed()
    .setTitle('Il gioco della palla da otto')
    .setColor('RANDOM')
    .setDescription('La mia risposta è.. ' + risposta + '.')
  message.channel.send({ embed });
};

exports.conf = {
  name: "Palla_otto",
  fullcmd: "palla_otto",
  alias: "pool",
  description: "Sei indeciso? Ci penserà la palla da otto a darti una risposta!",
  timer: 0,
  tokenCost: 0,
  subClass: 's_utility',
  displayHelp: 1
};

getRispose = () => {
  let id = Math.floor(Math.random() * 20) + 1;
  if (id == 1) {
    return "Per quanto posso vedere, sì";
  } else if (id == 2) {
    return "È certo";
  } else if (id == 3) {
    return "È decisamente così";
  } else if (id == 4) {
    return "Molto probabilmente";
  } else if (id == 5) {
    return "Le prospettive sono buone";
  } else if (id == 6) {
    return "Le mie fonti indicano di sì";
  } else if (id == 7) {
    return "Senza alcun dubbio";
  } else if (id == 8) {
    return "Sì";
  } else if (id == 9) {
    return "Sì, senza dubbio";
  } else if (id == 10) {
    return "Ci puoi contare";
  } else if (id == 11) {
    return "È difficile rispondere, prova di nuovo";
  } else if (id == 12) {
    return "Rifai la domanda più tardi";
  } else if (id == 13) {
    return "Meglio non risponderti adesso";
  } else if (id == 14) {
    return "Non posso predirlo ora";
  } else if (id == 15) {
    return "Concentrati e rifai la domanda";
  } else if (id == 16) {
    return "Non ci contare";
  } else if (id == 17) {
    return "La mia risposta è no";
  } else if (id == 18) {
    return "Le mie fonti dicono di no";
  } else if (id == 19) {
    return "Le prospettive non sono buone";
  } else if (id == 20) {
    return "Molto incerto";
  } else {
    return "Mi puoi rifare la domanda, non ho capito..";
  }
};