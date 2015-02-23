'use strict';
var assert = require('assert');
var fs = require('fs');
var requireUncached = require('require-uncached');

it('should get the npm registry URL globally', function () {
	assert(requireUncached('./')().length);
});

it('should get the npm registry URL locally', function (cb) {
	fs.writeFile('.npmrc', 'registry=http://registry.npmjs.eu/', function (err) {
		assert(!err, err);
		assert(requireUncached('./')() === 'http://registry.npmjs.eu/');

		fs.unlink('.npmrc', function (err) {
			assert(!err, err);
			cb();
		});
	});
});

it('should return local scope registry URL', function (cb) {
	fs.writeFile('.npmrc', '@myco:registry=http://reg.example.com/', function (err) {
		assert(!err, err);
		assert(requireUncached('./')('@myco') === 'http://reg.example.com/');

		fs.unlink('.npmrc', function (err) {
			assert(!err, err);
			cb();
		});
	});
});

it('should return default npm registry when scope registry not set', function (cb) {
	fs.writeFile('.npmrc', '', function (err) {
		assert(!err, err);
		assert(requireUncached('./')('@invalidScope') === 'https://registry.npmjs.org/');

		fs.unlink('.npmrc', function (err) {
			assert(!err, err);
			cb();
		});
	});
});
