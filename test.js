'use strict';
var assert = require('assert');
var registryUrl = require('./');

it('should get the npm registry URL from the npm config', function (cb) {
	registryUrl(function (err, url) {
		console.log('Registry URL:', url);
		assert(!err, err);
		assert(url.length > 0);
		cb();
	});
});
