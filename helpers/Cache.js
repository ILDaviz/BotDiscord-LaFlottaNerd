'user strict';

const botModel = require('./helpers/Models');
const fs = require('fs');

exports.resetCacheText = function(result){
    fs.readFile('./cache/text.json', function (err, content) {
        if (err) {
            result(err, false);
        }
        else {
            botModel.selectStringTexts(function(err,res){
                if (err) {
                    result(err, false);
                }
                else {
                    var obj = {
                        text: []
                    };
                    for (let i = 0; i < res.length; i++) {
                        let tag = res[i].tag;
                        let string = res[i].string;
                        obj.text.push({ id_refer: tag, string: encodeURIComponent(string) });
                    }
                    fs.writeFile('./cache/text.json', JSON.stringify(obj), function (err) {
                        if (err) {
                            result(err, false);
                        }
                        else {
                            result(null, true);
                        }
                    });
                }
            });
        }
    });
}
exports.selectCacheText = function(tag,bot) {
    let jsonData = require('./cache/text.json');
    for (let i = 0; i < jsonData.length; i++) {
        let tag_list = jsonData[i].tag;
        let string = jsonData[i].string;
        let bot_list = jsonData[i].bot;
        if (tag_list === tag && bot_list == bot ) {
            return decodeURIComponent(string);
        }
    }
}