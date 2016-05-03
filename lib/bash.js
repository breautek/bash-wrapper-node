'use strict';

var ChildProcess = require('child_process');

var _bashCmd = 'bash -c "%s"';
var cwd = process.cwd();

var _parseBash = function(cmd) {
	return _bashCmd.replace('%s', cmd);
};

var Bash = {
	cwd : function(directory) {
		if (directory) {
			cwd = directory;
		}
		return cwd;
	},

	exec : function(cmd, callback) {
		ChildProcess.exec(_parseBash(cmd), {
			cwd : cwd
		}, function(error, stdout, stderr) {
			callback && callback(error, stdout);
		});
	},

	execSync : function(cmd) {
		return ChildProcess.execSync(_parseBash(cmd), {
			cwd : cwd
		});
	}
};

module.exports = Bash;
