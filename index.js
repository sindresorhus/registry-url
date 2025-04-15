import {readFileSync} from 'node:fs';
import process from 'node:process';
import {findUpSync} from 'find-up-simple';
import {parse} from 'ini';

export const defaultUrl = 'https://registry.npmjs.org/';

const normalize = url => url.endsWith('/') ? url : `${url}/`;

export default function registryUrl(scope) {
	// Lowercased one is priority.
	// Run `NPM_CONFIG_REGISTRY=foo npm_config_registry=bar npm config get registry` to check.
	const npmConfigRegistry = process.env.npm_config_registry || process.env.NPM_CONFIG_REGISTRY;

	// Don't find up for performance.
	if (npmConfigRegistry && !scope) {
		return normalize(npmConfigRegistry);
	}

	const npmRcPath = findUpSync('.npmrc');
	if (!npmRcPath) {
		return normalize(npmConfigRegistry || defaultUrl);
	}

	const content = readFileSync(npmRcPath, 'utf8');
	const result = parse(content);
	return normalize(result[`${scope}:registry`] || npmConfigRegistry || result.registry || defaultUrl);
}
