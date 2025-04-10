# registry-url

> Get the set npm registry URL

It's usually `https://registry.npmjs.org/`, but it's [configurable](https://docs.npmjs.com/misc/registry).

Use this if you do anything with the npm registry as users will expect it to use their configured registry.

## Install

```sh
npm install registry-url
```

## Usage

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

If the provided scope is not in the user's `.npmrc` file, then `registry-url` will check for the existence of `registry`, or if that's not set, fallback to the default npm registry.
