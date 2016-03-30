'use strict';
module.exports = function (scope) {
	var rc = require('rc')('npm', {registry: 'https://registry.npmjs.org/'});
	return appendTrailingSlash(rc[scope + ':registry'] || rc.registry);
};

function appendTrailingSlash(str) {
	return str.slice(-1) === '/' ? str : str + '/';
}
