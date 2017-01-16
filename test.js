'use strict';

var Bash = require('./lib/bash.js');

Bash.isSupported(function(support) {
	console.log(support);

	if (support) {
		Bash.exec('ls', function(error, output) {
			if (error) {
				console.log(error);
			}

			console.log(output);
		});
	}
});
