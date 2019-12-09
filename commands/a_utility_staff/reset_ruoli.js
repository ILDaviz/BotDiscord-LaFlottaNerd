
const botUtili = require('../../helpers/Util');
const json = require('../../helpers/json');
const Discord = require('discord.js');

exports.run = async (message, bot) => {
  if (!message.member.roles.some(r => ["Admin", "Developer"].includes(r.name)))
    return message.reply("Mi dispiace, ma non hai le autorizzazioni per usare questo comando.");

  // Estrae i ruoli dalla gilda
  let ruletag = json.getSetting('role_tag');
  let emoji = json.getSetting('emoji');
  let guild = bot.guilds.get(bot.conf.guild_lfn_id);
  let rules = guild.roles.array();
  let associate_role = [];
  // Popola il recipiente
  for (let i = 0; i < rules.length; i++) {
    let name_rule = rules[i].name;
    //Controlla la presenza del tag nel nome
    if (name_rule.indexOf(ruletag) >= 0) {
      associate_role.push({ 'role': name_rule, 'emoji': emoji[i] });
    }
  }
  //Fericifa il passaggio
  try {
      //Stampa in settings
      json.updateSetting('role_selector', associate_role);
      let emb = new Discord.RichEmbed()
        .setTitle(`Reset json ruoli`)
        .setColor("RANDOM")
        .setDescription("Processo completato");
      message.channel.send(emb);
  } catch (error) {
     console.log(error);
  }
};

exports.conf = {
    name: "Reset_ruoli",
    fullcmd: "resetruoli",
    alias: "rolereset",
    description: "Questo comando resetta un file json con all'interno tutti i ruoli sezionie che iniziano con $$ quando si aggiunge un nuovo ruolo sarà necessario avviare questo comando per integrarlo nel sistema.",
    timer: 0,
    tokenCost: 0,
    subClass: 'utility_staff',
    displayHelp: 1
};