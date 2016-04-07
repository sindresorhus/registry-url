import fs from 'fs';
import test from 'ava';
import pify from 'pify';
import requireUncached from 'require-uncached';

const fsP = pify(fs, Promise);

test.afterEach(async () => {
	try {
		await fsP.unlink('.npmrc');
	} catch (err) {
		if (err.code !== 'ENOENT') {
			throw err;
		}
	}
});

test('get the npm registry URL globally', t => {
	t.truthy(requireUncached('./')().length);
});

test('get the npm registry URL locally', async t => {
	await fsP.writeFile('.npmrc', 'registry=http://registry.npmjs.eu/');

	t.is(requireUncached('./')(), 'http://registry.npmjs.eu/');
});

test('get local scope registry URL', async t => {
	await fsP.writeFile('.npmrc', '@myco:registry=http://reg.example.com/');

	t.is(requireUncached('./')('@myco'), 'http://reg.example.com/');
});

test('return default npm registry when scope registry is not set', async t => {
	await fsP.writeFile('.npmrc', '');

	t.is(requireUncached('./')('@invalidScope'), 'https://registry.npmjs.org/');
});

test('add trailing slash to local npm registry URL', async t => {
	await fsP.writeFile('.npmrc', 'registry=http://registry.npmjs.eu');

	t.is(requireUncached('./')(), 'http://registry.npmjs.eu/');
});

test('add trailing slash to local scope registry URL', async t => {
	await fsP.writeFile('.npmrc', '@myco:registry=http://reg.example.com');

	t.is(requireUncached('./')('@myco'), 'http://reg.example.com/');
});
