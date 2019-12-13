
const botModel = require('../../helpers/models');

exports.run = async (message, bot) => {
  if (!message.member.roles.some(r => ["Admin", "Developer"].includes(r.name)))
    return message.reply("Mi dispiace, ma non hai le autorizzazioni per usare questo comando.");
  
  let users = botModel.selectUsers(Function(err,res){
    
  });

};

exports.conf = {
  name: "Doppioni",
  fullcmd: "doppioni",
  alias: "doppioni",
  description: "",
  timer: 0,
  tokenCost: 0,
  subClass: 'utility_staff',
  displayHelp: 0
};