import {readFileSync} from 'node:fs';
import process from 'node:process';
import {findUpSync} from 'find-up-simple';
import {parse} from 'ini';

export const defaultUrl = 'https://registry.npmjs.org/';

const normalize = url => url.endsWith('/') ? url : `${url}/`;

export default function registryUrl(scope) {
	const npmRcPath = findUpSync('.npmrc');
	if (!npmRcPath) {
		return normalize(process.env.npm_config_registry || defaultUrl);
	}

	const content = readFileSync(npmRcPath, 'utf8');
	const result = parse(content);
	return normalize(result[`${scope}:registry`] || process.env.npm_config_registry || result.registry || defaultUrl);
}
