import fs from 'fs';
import test from 'ava';
import pify from 'pify';
import importFresh from 'import-fresh';

const fsP = pify(fs);

delete process.env.npm_config_registry;
test.afterEach(async () => {
	try {
		await fsP.unlink('.npmrc');
	} catch (_) {}
});

test('get the npm registry URL globally', t => {
	t.truthy(importFresh('.')().length);
});

test('works with npm_config_registry in the environment', t => {
	// eslint-disable-next-line camelcase
	process.env.npm_config_registry = 'http://registry.example';
	t.is(importFresh('.')(), 'http://registry.example/');
	delete process.env.npm_config_registry;
});

test('get the npm registry URL locally', async t => {
	await fsP.writeFile('.npmrc', 'registry=http://registry.npmjs.eu/');

	t.is(importFresh('.')(), 'http://registry.npmjs.eu/');
});

test('get local scope registry URL', async t => {
	await fsP.writeFile('.npmrc', '@myco:registry=http://reg.example.com/');

	t.is(importFresh('.')('@myco'), 'http://reg.example.com/');
});

test('return default npm registry when scope registry is not set', async t => {
	await fsP.writeFile('.npmrc', '');

	t.is(importFresh('.')('@invalidScope'), 'https://registry.npmjs.org/');
});

test('add trailing slash to local npm registry URL', async t => {
	await fsP.writeFile('.npmrc', 'registry=http://registry.npmjs.eu');

	t.is(importFresh('.')(), 'http://registry.npmjs.eu/');
});

test('add trailing slash to local scope registry URL', async t => {
	await fsP.writeFile('.npmrc', '@myco:registry=http://reg.example.com');

	t.is(importFresh('.')('@myco'), 'http://reg.example.com/');
});
