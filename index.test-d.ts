import {expectType} from 'tsd';
import registryUrl, {defaultUrl} from './index.js';

expectType<string>(defaultUrl);
expectType<string>(registryUrl());
expectType<string>(registryUrl('@myco'));
