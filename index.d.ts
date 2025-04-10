/**
Get the set npm registry URL.

@param scope - Retrieve the registry URL associated with an [npm scope](https://docs.npmjs.com/misc/scope). If the provided scope is not in the user's `.npmrc` file, then `registry-url` will check for the existence of `registry`, or if that's not set, fallback to the default npm registry.

@example

```ini
# .npmrc
registry = 'https://custom-registry.com/'
```

```js
import registryUrl, {defaultUrl} from 'registry-url';

console.log(registryUrl());
//=> 'https://custom-registry.com/'

console.log(defaultUrl);
//=> 'https://registry.npmjs.org/'
```

It can also retrieve the registry URL associated with an [npm scope](https://docs.npmjs.com/misc/scope).

```ini
# .npmrc
@myco:registry = 'https://custom-registry.com/'
```

```js
import registryUrl from 'registry-url';

console.log(registryUrl('@myco'));
//=> 'https://custom-registry.com/'
```
*/
export default function registryUrl(scope?: string): string;

/**
The default npm registry URL.
*/
export const defaultUrl: string;
