'user strict';

const botModel = require('../helpers/Models');
const fs = require('fs');

var _this = this;

exports.resetCacheText = function(result){
    fs.readFile('./cache/text.json', function (err, content) {
        if (err) {
            console.log(err);
            result(err, false);
        }
        else {
            botModel.selectSettingFromType('text', function(err,res){
                if (err) {
                    console.log(err);
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
                            console.log(err);
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
            console.log(err);
            result(err, false);
        }
        else {
            botModel.selectSettingFromType('role', function(err,res){
                if (err) {
                    console.log(err);
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
                            console.log(err);
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


exports.resetTriggerCache = function(result){
    fs.readFile('./cache/trigger.json', function (err, content) {
        if (err) {
            console.log(err);
            result(err, false);
        }
        else {
            botModel.selectSettingFromType('trigger', function(err,res){
                var obj = {
                    trigger: []
                };
                for (let i = 0; i < res.length; i++) {
                    let name = res[i].name;
                    let value = res[i].value;
                    obj.trigger.push({ rif: name, trigger: value });
                }
                fs.writeFile('./cache/trigger.json', JSON.stringify(obj), function (err) {
                    if (err) {
                        console.log(err);
                        result(err, false);
                    }
                    else {
                        result(null, true);
                    }
                });
            });
        }
    });
}

exports.selectCacheText = function(tag) {
    let text_json = require('../cache/text.json');
    if (text_json) {
        let data = text_json.text;
        for (let i = 0; i < data.length; i++) {
            let tag_list = data[i].id_refer;
            let string = data[i].string;
            if (tag_list === tag) {
                return unescape(string);
            }
        }
    } else {
        return '';
    }
}

exports.selectCacheRole = () => {
    var value = [];
    let text_json = require('../cache/role.json');
    if (text_json){
        let role = text_json.role;
        for (let i = 0; i < role.length; i++) {
            let element = role[i].string;
            value.push(unescape(element));
        }
    }
    return value;
}

exports.selectCacheTrigger = function(name_trigger,group){
    var value = [];
    let trigger_json = require('../cache/trigger.json');
    if (trigger_json){
        let role = trigger_json.trigger;
        for (let i = 0; i < role.length; i++) {
            let element = role[i].rif;
            let trigger = role[i].trigger;
            let et = element.trim().split('-');
            if (et[0] == name_trigger && et[1] == group) {
                value.push(unescape(trigger));
            }
        }
    }
    return value;
}

exports.resetCache = function(result) {
    _this.resetCacheText(function(err,res){
        if (err) {
            result(err);
        } else {
            _this.resetChaceRole(function(err,res){
                if (err) {
                    result(err);
                } else {
                    _this.resetTriggerCache(function(err,res){
                        if (err) {
                            result(err);
                        } else {
                            result(null);
                        }
                    });
                }
            });
        }
    });
}