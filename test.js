'use strict';

var Bash = require('./lib/bash.js');

Bash.exec('ls', function(error, output) {
	if (error) {
		console.log(error);
	}

	console.log(output);
});
