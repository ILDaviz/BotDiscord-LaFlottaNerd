'user strict';
/** Carica e scrive i dati dai json */
//https://github.com/typicode/lowdb
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
/** Estrazione dei settaggi dal json */
exports.getSetting = function(reference_item){
    let setting = lowdb(new FileSync('./json/settings.json'));
    $value = setting.get(reference_item).value();
    return $value;
}
/** Mostra tutti i settaggi */
exports.getSettings = function(){
    return low(new FileSync('./json/settings.json')); 
}
/** Aggiorna un settaggo */
exports.updateSetting = function(name,value){
    let settings = lowdb(new FileSync('./json/settings.json'));
    settings.set(name,value).write();
}
/** Estrazione dei testi dal json */
exports.getText = function(reference_item){
    let texts = lowdb(new FileSync('./json/texts.json'));
    $value = texts.get(reference_item).value();
    return $value;
}
/** Estrazione dei rank */
exports.getRanke = function(reference_item){
    let texts = lowdb(new FileSync('./json/rank.json'));
    $value = texts.get(reference_item).value();
    return $value;
}


