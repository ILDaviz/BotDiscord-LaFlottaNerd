'user strict';

var db_users = require('../helpers/Dbjson').users;
var db_settings = require('../helpers/Dbjson').settings;
var db_names = require('../helpers/Dbjson').livel_names;
var db_texts = require('../helpers/Dbjson').texts;
var db_users = require('../helpers/Dbjson').users;


var Models = function () {
    //Costructor
};

Models.addUsers = function (data_user ,result) {
  //Crea la nuova chiave di inserimento
  let new_id = db_users.get('last_counter') + 1;
  //
  db.get('users')
    .push(
        {"id_users":new_id,
        "id_discord":"537249527170727959",
        "notified":"0",
        "messages":"124",
        "messages_day":"7",
        "presences":"668",
        "presence_day":"23",
        "presence_update":"896",
        "presence_message":"419",
        "presence_reaction":"193",
        "last_check":null,
        "bot_mention":"0",
        "rule_selected":"0"
      }).write()
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