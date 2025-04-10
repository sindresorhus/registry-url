import fs from 'node:fs/promises';
import process from 'node:process';
import test from 'ava';

const importFresh = async modulePath => import(`${modulePath}?x=${new Date()}`);

delete process.env.npm_config_registry;
test.afterEach(async () => {
	try {
		await fs.unlink('.npmrc');
	} catch {}
});

test('get the npm registry URL globally', async t => {
	const {default: registryUrl} = await importFresh('./index.js');
	t.truthy(registryUrl().length);
});

test('works with npm_config_registry in the environment', async t => {
	// eslint-disable-next-line camelcase
	process.env.npm_config_registry = 'http://registry.example';
	const {default: registryUrl} = await importFresh('./index.js');
	t.is(registryUrl(), 'http://registry.example/');
	delete process.env.npm_config_registry;
});

test('get the npm registry URL locally', async t => {
	await fs.writeFile('.npmrc', 'registry=http://registry.npmjs.eu/');

	const {default: registryUrl} = await importFresh('./index.js');
	t.is(registryUrl(), 'http://registry.npmjs.eu/');
});

test('get local scope registry URL', async t => {
	await fs.writeFile('.npmrc', '@myco:registry=http://reg.example.com/');

	const {default: registryUrl} = await importFresh('./index.js');
	t.is(registryUrl('@myco'), 'http://reg.example.com/');
});

test('return default npm registry when scope registry is not set', async t => {
	await fs.writeFile('.npmrc', '');

	const {default: registryUrl} = await importFresh('./index.js');
	t.is(registryUrl('@invalidScope'), 'https://registry.npmjs.org/');
});

test('add trailing slash to local npm registry URL', async t => {
	await fs.writeFile('.npmrc', 'registry=http://registry.npmjs.eu');

	const {default: registryUrl} = await importFresh('./index.js');
	t.is(registryUrl(), 'http://registry.npmjs.eu/');
});

test('add trailing slash to local scope registry URL', async t => {
	await fs.writeFile('.npmrc', '@myco:registry=http://reg.example.com');

	const {default: registryUrl} = await importFresh('./index.js');
	t.is(registryUrl('@myco'), 'http://reg.example.com/');
});

test('default npm registry url is https://registry.npmjs.org/', async t => {
	const {defaultUrl} = await importFresh('./index.js');
	t.is(defaultUrl, 'https://registry.npmjs.org/');
});
