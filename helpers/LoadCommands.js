'user strict';

const fs = require('fs');
const path = require('path');
let cmds = {};

let cmdHelp = [];

exports.load = (dir = "./commands/") => {
	fs.readdir('./commands/', (err, files) => {
		if (err) return console.log(err);
		files.forEach(f => {
			file = path.resolve(dir, f);
			fs.stat(file, function (err, stat) {
				if (stat && stat.isDirectory()) {
					fs.readdir(dir + f, (err, files) => {
						if (err) return console.log(err);
						let var_dir = '../commands/' + f + '/';
						files.forEach(f => {
							let cmd = require(var_dir + f);
							let name = f.slice(0, -3);
							cmds[name] = { run: cmd.run, conf: cmd.conf };
							cmds[cmd.conf.alias] = { run: cmd.run, conf: cmd.conf, timer: new Date().getTime() }
							cmdHelp.push({ cmdName: cmd.conf.name, alias: cmd.conf.alias, description: cmd.conf.description, cost: cmd.conf.tokenCost, subClass: cmd.conf.subClass, displayHelp: cmd.conf.displayHelp });
						});
					});
				} else {
					let cmd = require("../commands/" + f);
					let name = f.slice(0, -3);
					cmds[name] = { run: cmd.run, conf: cmd.conf };
					cmds[cmd.conf.alias] = { run: cmd.run, conf: cmd.conf, timer: new Date().getTime() }
					cmdHelp.push({ cmdName: cmd.conf.name, alias: cmd.conf.alias, description: cmd.conf.description, cost: cmd.conf.tokenCost, subClass: cmd.conf.subClass, displayHelp: cmd.conf.displayHelp });
				}
			})
		})
	})
};

exports.reload = (cmd) => {
	try {
		delete require.cache[require.resolve('../commands/' + cmd)];
		let good = require('../commands/' + cmd);
		cmds[cmd] = {run: good.run, conf: good.conf};
		return {worked: true};
	} catch (err) {
		delete cmds[cmd];
		return {worked: false, error: err};
	}
};

exports.getCmds = () => {
	return cmds;
};

exports.cmdDetail = cmdHelp;