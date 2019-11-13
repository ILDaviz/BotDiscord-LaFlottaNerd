'user strict';
/** Libreria testi bot */
//https://github.com/typicode/lowdb
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
/** Richiamo della libreria */
const texts = low(new FileSync('./texts.json'))
/** Estrazione dei testi dal json */
exports.getText = function(reference_item){
    $value = texts.get('texts')
    .find({ reference: reference_item })
    .value()
    return $value.text;
}