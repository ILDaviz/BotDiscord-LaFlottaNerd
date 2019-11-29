// 'user strict';
// /** Carica e scrive i dati dai json */
// //https://github.com/typicode/lowdb
// import lowdb from 'lowdb';
// import FileSync from 'lowdb/adapters/FileSync';
// /** Estrazione dei settaggi dal json */
// export getSetting(reference_item){
//     let setting = lowdb(new FileSync('../json/settings.json'));
//     $value = setting.get(reference_item).value();
//     return $value;
// }
// /** Mostra tutti i settaggi */
// exports.getSettings = function(){
//     return low(new FileSync('../json/settings.json')); 
// }
// /** Aggiorna un settaggo */
// exports.updateSetting = function(name,value){
//     let settings = lowdb(new FileSync('../json/settings.json'));
//     settings.update(name,value).write();
// }
// /** Estrazione dei testi dal json */
// exports.getText = function(reference_item){
//     let texts = lowdb(new FileSync('../json/texts.json'));
//     $value = texts.get(reference_item).value();
//     return $value;
// }
// /** Estrazione dei rank */
// exports.getRanke = function(reference_item){
//     let texts = lowdb(new FileSync('../json/rank.json'));
//     $value = texts.get(reference_item).value();
//     return $value;
// }


import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

export class Jsondata {

    private file_settings;
    private file_texts;
    private file_rank;
    private file_users;

    private url_settings = '../json/settings.json';
    private url_texts = '../json/settings.json';
    private url_rank = '../json/settings.json';
    private url_users = '../json/users.json';

    constructor() {
        //Set item object
        this.SetItem();
    }

    /**
     * SettingsFile
     * Collega tutti gli items.
     */
    private SetItem() {
        this.file_settings = lowdb(new FileSync(this.url_settings));
        this.file_texts = lowdb(new FileSync(this.url_texts));
        this.file_rank = lowdb(new FileSync(this.url_rank));
        this.file_users = lowdb(new FileSync(this.url_users));
    }

    /**
     * getSettings
     * Mostra un settaggio specifico
     */
    getSetting(reference_item:string) {
        return this.file_settings.get(reference_item).value();
    }

    /**
     * getSettings
     */
    public getSettings() {
        
    }
}