const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

//https://github.com/typicode/lowdb

/**
 * Costruzione database del bot via json.
 */

module.exports.users = low(new FileSync('./database/users.json'))
module.exports.settings = low(new FileSync('./database/settings.json'))
module.exports.texts = low(new FileSync('./database/texts.json'))
module.exports.livel_names = low(new FileSync('./database/livel_names.json'))
module.exports.roles = low(new FileSync('./database/roles.json'))
module.exports.scorciatoie = low(new FileSync('./database/scorciatoie.json'))
module.exports.triggers = low(new FileSync('./database/triggers.json'))
