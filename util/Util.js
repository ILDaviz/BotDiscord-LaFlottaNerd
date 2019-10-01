'user strict';

const botModel = require('./model/Models');
const fs = require('fs');
/**
 * Classe delle Utility
 */
class Util {
    constructor(){}
    /**
     * Stampa il livello cacciatore
     * @param {Number} livel il livello del cacciatore in numero
     */
    getGradoCacciatore(livel){
        var name = "";
        if (livel >= 10 && livel < 30) {
            name = "Novizio LIV I";
        } else if (livel >= 30 && livel < 50) {
            name = "Novizio LIV II";
        } else if (livel >= 50 && livel < 100) {
            name = "Novizio LIV III";
        } else if (livel >= 100 && livel < 200) {
            name = "Apprendista LIV I";
        } else if (livel >= 200 && livel < 300) {
            name = "Apprendista LIV II";
        } else if (livel >= 300 && livel < 400) {
            name = "Apprendista LIV III";
        } else if (livel >= 400 && livel < 500) {
            name = "Felyne Lavapiatti LIV I";
        } else if (livel >= 500 && livel < 600) {
            name = "Felyne Lavapiatti LIV II";
        } else if (livel >= 600 && livel < 750) {
            name = "Felyne Lavapiatti LIV III";
        } else if (livel >= 750 && livel < 1000) {
            name = "Felyne Alchimista";
        } else if (livel >= 1000 && livel < 1250) {
            name = "Felyne Guaritore";
        } else if (livel >= 1250 && livel < 1500) {
            name = "Mercante di ossa";
        } else if (livel >= 1500 && livel < 1750) {
            name = "Mercante di spezie";
        } else if (livel >= 1750 && livel < 2000) {
            name = "Mercante di gemme";
        } else if (livel >= 2000 && livel < 2250) {
            name = "Forgiatore Novizio";
        } else if (livel >= 2250 && livel < 2500) {
            name = "Forgiatore Apprendista";
        } else if (livel >= 2500 && livel < 2750) {
            name = "Forgiatore Mastro";
        } else if (livel >= 2750 && livel < 3000) {
            name = "Assistente Incapace";
        } else if (livel >= 3000 && livel < 3250) {
            name = "Assistente Esperto";
        } else if (livel >= 3250 && livel < 3500) {
            name = "Soldato Imbranato";
        } else if (livel >= 3500 && livel < 3750) {
            name = "Soldato Spavaldo";
        } else if (livel >= 3750 && livel < 4000) {
            name = "Soldato Romantico";
        } else if (livel >= 4000 && livel < 4250) {
            name = "Soldato Elite";
        } else if (livel >= 4250 && livel < 4500) {
            name = "Amico della quinta";
        } else if (livel >= 4500 && livel < 4750) {
            name = "Baby Drago";
        } else if (livel >= 4750 && livel < 5000) {
            name = "Drago Spavaldo";
        } else if (livel >= 5000 && livel < 5250) {
            name = "Drago Imperatore";
        } else if (livel >= 5250 && livel < 5500) {
            name = "Spacca Draghi";
        } else if (livel >= 5500 && livel < 5750) {
            name = "Sterminatore di draghi";
        } else if (livel >= 5750) {
            name = "Stella di zaffiro";
        }
        return name;
    }
    /**
     * Questo script analizza il testo e ne cerca similitudini con le parole indicate.
     * @param {String} str Testo da analizzare 
     */
    censure(str) {
        var lista_bestemmie = ["dio cane", "diocane", "porcodio", "porco dio"];
        var arrayLength = lista_bestemmie.length;
        var status = 0;
        for (var i = 0; i < arrayLength; i++) {
            var pattern = new RegExp(lista_bestemmie[i], 'i');
            if (pattern.test(str)) {
                status += 1;
            }
        }
        if (status >= 1) {
            return true;
        } else {
            return false;
        }
    }
    /**
     * Da una risposta casuale (Gioco palla da otto)
     */
    getRispose(){
        let id = Math.floor(Math.random() * 20) + 1;
        if (id == 1) {
            return "Per quanto posso vedere, sì";
        } else if (id == 2) {
            return "È certo";
        } else if (id == 3) {
            return "È decisamente così";
        } else if (id == 4) {
            return "Molto probabilmente";
        } else if (id == 5) {
            return "Le prospettive sono buone";
        } else if (id == 6) {
            return "Le mie fonti indicano di sì";
        } else if (id == 7) {
            return "Senza alcun dubbio";
        } else if (id == 8) {
            return "Sì";
        } else if (id == 9) {
            return "Sì, senza dubbio";
        } else if (id == 10) {
            return "Ci puoi contare";
        } else if (id == 11) {
            return "È difficile rispondere, prova di nuovo";
        } else if (id == 12) {
            return "Rifai la domanda più tardi";
        } else if (id == 13) {
            return "Meglio non risponderti adesso";
        } else if (id == 14) {
            return "Non posso predirlo ora";
        } else if (id == 15) {
            return "Concentrati e rifai la domanda";
        } else if (id == 16) {
            return "Non ci contare";
        } else if (id == 17) {
            return "La mia risposta è no";
        } else if (id == 18) {
            return "Le mie fonti dicono di no";
        } else if (id == 19) {
            return "Le prospettive non sono buone";
        } else if (id == 20) {
            return "Molto incerto";
        } else {
            return "Mi puoi rifare la domanda, non ho capito..";
        }
    }
}

module.exports = Util;