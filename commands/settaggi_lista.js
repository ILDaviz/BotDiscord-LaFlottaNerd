const Discord  = require('discord.js');
const botModel = require('../helpers/Models');
const botUtili = require('../helpers/Util');
const botCache = require('../helpers/Cache');

exports.run = async (message, bot) => {
  
  const args = message.content.slice(bot.conf.prefix.length).trim().split(/ +/g);
  const args_1 = args.slice(1).join(' ');
  const args_2 = args.slice(2).join(' ');

  if (!message.member.roles.some(r => ["Admin", "Developer"].includes(r.name)))
    return message.reply("Mi dispiace, ma non hai le autorizzazioni per usare questo comando.");
  
  botModel.selectSettings(args_1, function (err, res) {
    if (res.length === 0) {
      return message.reply("Mi dispiace, ma non ci sono settaggi.");
    }
      let text = ''
    for (let index = 0; index < res.length; index++) {
      let id_settings = res[index].id_settings;
      let name = res[index].name;
        text += "id:" + id_settings + " name:" + name + "\n";
      }

      let embed = new Discord.RichEmbed()
        .setTitle('Settaggio:')
        .setColor(0xFFFF)
        .addField("settings disponibili:", text)
      message.channel.send({ embed });

  });
};

exports.conf = {
    name: "Lista_settaggi",
    fullcmd: "lista_settaggi",
    alias: "listsett",
    description: "[tipo (opzionale)] Mostra una lista con tutti i settaggi disponibili",
    timer: 0,
    tokenCost: 0,
    subClass: 'help_settaggi',
    displayHelp: 1
};