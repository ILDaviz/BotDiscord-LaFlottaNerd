'user strict';

const botModel = require('../helpers/Models');
const fs = require('fs');

exports.resetCacheText = function(result){
    fs.readFile('./cache/text.json', function (err, content) {
        if (err) {
            result(err, false);
        }
        else {
            botModel.selectSettingFromType('text', function(err,res){
                if (err) {
                    result(err, false);
                }
                else {
                    var obj = {
                        text: []
                    };
                    for (let i = 0; i < res.length; i++) {
                        let name = res[i].name;
                        let value = res[i].value;
                        obj.text.push({ id_refer: name, string: value });
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

exports.resetChaceRole = function(result){
    fs.readFile('./cache/role.json', function (err, content) {
        if (err) {
            result(err, false);
        }
        else {
            botModel.selectSettingFromType('role', function(err,res){
                if (err) {
                    result(err, false);
                }
                else {
                    var obj = {
                        role: []
                    };
                    for (let i = 0; i < res.length; i++) {
                        let name = res[i].name;
                        let value = res[i].value;
                        obj.role.push({ id_refer: name, string: value });
                    }
                    fs.writeFile('./cache/role.json', JSON.stringify(obj), function (err) {
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

exports.selectCacheText = function(tag) {
    let text_json = require('../cache/text.json');
    let data = text_json.text;
    for (let i = 0; i < data.length; i++) {
        let tag_list = data[i].id_refer;
        let string = data[i].string;
        if (tag_list === tag) {
            return unescape(string);
        }
    }
}

exports.selectCacheRole = () => {
    var value = [];
    let text_json = require('../cache/role.json');
    let role = text_json.role;
    for (let i = 0; i < role.length; i++) {
        let element = role[i].string;
        value.push(unescape(element));
    }
    return value;
}

exports.resetCache = function() {
    this.resetCacheText(function(err,res){ });
    this.resetChaceRole(function(err,res){ });
}