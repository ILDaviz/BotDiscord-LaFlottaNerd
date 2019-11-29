const Discord  = require('discord.js');
const botModel = require('../../helpers/Models');
const texts = require("../../helpers/Json");

exports.run = async (message, bot) => {
  
  const args = message.content.slice(bot.conf.prefix.length).trim().split(/ +/g);
  const args_secondo = args.slice(2).join(' ');

  if (!message.member.roles.some(r => ["Admin", "Developer"].includes(r.name)))
    return message.reply(texts.getText('message_error_authorization'));

  botModel.selectSettings(args_secondo, function (err, res) {
    for (let index = 1; index < res.length; index++) {
      let id_settings = res[index].id_settings;
      let name = res[index].name;
      let value = unescape(res[index].value);
      let value_txt = value.substring(0, 1000);
      let embed = new Discord.RichEmbed()
        .setTitle("Settaggio id: " + id_settings + " // Tipologia: " + name + "\n")
        .setColor('RANDOM')
        .addField("Testo:", value_txt)
      message.channel.send({ embed });
    }
  });
};

exports.conf = {
    name: "Lista_settaggi",
    fullcmd: "lista_settaggi",
    alias: "listsett",
    description: texts.getText('command_lista_settaggi_description'),
    timer: 0,
    tokenCost: 0,
    subClass: 'impostazioni',
    displayHelp: 1
};