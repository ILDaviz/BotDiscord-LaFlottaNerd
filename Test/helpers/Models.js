'user strict';

var db_users = require('../helpers/Dbjson').users;
var db_settings = require('../helpers/Dbjson').settings;
var db_names = require('../helpers/Dbjson').livel_names;
var db_texts = require('../helpers/Dbjson').texts;

var Models = function () {
    //Costructor
};


Models.Users = function (
    method,
    id_discord, 
    notified = 0, 
    messages = 0, 
    messages_day = 0, 
    presences = 0, 
    presence_day = 0, 
    presence_update = 0, 
    presence_message = 0, 
    presence_reaction = 0, 
    last_check = null, 
    bot_mention = 0, 
    rule_selected = 0, 
    result) {
  //Crea la nuova chiave di inserimento
  let new_id = db_users.get('last_counter') + 1;
  
  switch (method) {
        case 'push':
            db.get('users')
            .push(
                {"id_users":new_id,
                "id_discord":id_discord,
                "notified": notified,
                "messages": messages,
                "messages_day": messages_day,
                "presences": presences,
                "presence_day": presence_day,
                "presence_update": presence_update,
                "presence_message": presence_message,
                "presence_reaction": presence_reaction,
                "last_check": last_check,
                "bot_mention": bot_mention,
                "rule_selected": rule_selected
            }).write().then( value => {
                console.log(value); // Success!
            }, reason => {
                console.log(reason); // Error!
            } );
            break;
        case 'get':
            
            break;

      default:
          break;
  }
}






Models.selectSettings = function (type = null ,result) {
    var query = "SELECT * FROM settings ";
    
    if (type) {
        query += "WHERE type = '" + type + "'";
    }

    sql.query(query, function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, JSON.parse(JSON.stringify(res)));
        }
    });
};

module.exports = Models;