import {promisify} from 'util';
import fs from 'fs';
import test from 'ava';

// eslint-disable-next-line node/no-unsupported-features/es-syntax
const importFresh = async modulePath => import(`${modulePath}?x=${new Date()}`);

const unlinkP = promisify(fs.unlink);
const writeFileP = promisify(fs.writeFile);

delete process.env.npm_config_registry;
test.afterEach(async () => {
	try {
		await unlinkP('.npmrc');
	} catch {}
});

test('get the npm registry URL globally', async t => {
	t.truthy((await importFresh('./index.js')).default().length);
});

test('works with npm_config_registry in the environment', async t => {
	// eslint-disable-next-line camelcase
	process.env.npm_config_registry = 'http://registry.example';
	t.is((await importFresh('./index.js')).default(), 'http://registry.example/');
	delete process.env.npm_config_registry;
});

test('get the npm registry URL locally', async t => {
	await writeFileP('.npmrc', 'registry=http://registry.npmjs.eu/');

	t.is((await importFresh('./index.js')).default(), 'http://registry.npmjs.eu/');
});

test('get local scope registry URL', async t => {
	await writeFileP('.npmrc', '@myco:registry=http://reg.example.com/');

	t.is((await importFresh('./index.js')).default('@myco'), 'http://reg.example.com/');
});

test('return default npm registry when scope registry is not set', async t => {
	await writeFileP('.npmrc', '');

	t.is((await importFresh('./index.js')).default('@invalidScope'), 'https://registry.npmjs.org/');
});

test('add trailing slash to local npm registry URL', async t => {
	await writeFileP('.npmrc', 'registry=http://registry.npmjs.eu');

	t.is((await importFresh('./index.js')).default(), 'http://registry.npmjs.eu/');
});

test('add trailing slash to local scope registry URL', async t => {
	await writeFileP('.npmrc', '@myco:registry=http://reg.example.com');

	t.is((await importFresh('./index.js')).default('@myco'), 'http://reg.example.com/');
});
