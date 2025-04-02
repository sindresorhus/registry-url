import {readFileSync} from 'node:fs';
import {findUpSync} from 'find-up-simple';
import {parse} from 'ini';

export default function registryUrl(scope) {
	const defaultRegistry = 'https://registry.npmjs.org/';
	const npmRcPath = findUpSync('.npmrc');
	if (!npmRcPath) {
		return process.env.npm_config_registry || defaultRegistry;
	}

	const content = readFileSync(npmRcPath, 'utf8');
	const result = parse(content);
	const url = result[`${scope}:registry`] || process.env.npm_config_registry || result.registry || defaultRegistry;
	return url.endsWith('/') ? url : `${url}/`;
}
