'use strict';
var assert = require('assert');
var fs = require('fs');
var requireUncached = require('require-uncached');

it('should get the npm registry URL globally', function () {
	assert(requireUncached('./').length);
});

it('should get the npm registry URL locally', function (cb) {
	fs.writeFile('.npmrc', 'registry=http://registry.npmjs.eu/', function (err) {
		assert(!err, err);
		assert(requireUncached('./') === 'http://registry.npmjs.eu/');

		fs.unlink('.npmrc', function (err) {
			assert(!err, err);
			cb();
		});
	});
});
