'use strict';
module.exports = scope => {
	const rc = require('rc')('npm', {registry: 'https://registry.npmjs.org/'});
	const url = rc[scope + ':registry'] || rc.config_registry || rc.registry;
	return url.slice(-1) === '/' ? url : url + '/';
};
