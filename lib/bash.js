'use strict';

var ChildProcess = require('child_process');
var FileSystem = require('fs');
var Path = require('path');

var _bashCmd = 'bash -c "%s"';
var cwd = process.cwd();

var _parseBash = function(cmd) {
	return _bashCmd.replace('%s', cmd);
};

var _checkSupport = function(paths, callback) {
	//this is only invoked for windows
	var supported = false;
	for (var i = 0; i < paths.length; i++) {
		if (!paths[i]) continue;
		var path = Path.normalize(paths[i] + '/bash.exe');
		FileSystem.stat(path, function(error, stat) {
			if (!error && stat.isFile() && !supported) {
				supported = true;
				callback && callback(true);
			}
			else if (error) {
				if (paths.indexOf(path) === paths.length - 1) {
					callback && callback(false);
				}
			}
		});
	}
};

var Bash = {
	isSupported : function(callback) {
		var platform = process.platform;
		if (platform === 'win32') {
			var paths = process.env.Path.split(';');
			_checkSupport(paths, callback);
		}
		else {
			//linux/mac support is assumed.
			callback && callback(true);
		}
	},

	cwd : function(directory) {
		if (directory) {
			cwd = directory;
		}
		return cwd;
	},

	exec : function(cmd, callback) {
		ChildProcess.exec(_parseBash(cmd), {
			cwd : cwd,
			stdio : ['inhert']
		}, function(error, stdout, stderr) {
			callback && callback(error, stdout, stderr);
		});
	},

	execSync : function(cmd) {
		return ChildProcess.execSync(_parseBash(cmd), {
			cwd : cwd
		});
	}
};

module.exports = Bash;
