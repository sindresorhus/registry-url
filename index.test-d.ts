import {expectType} from 'tsd';
import registryUrl from './index.js';

expectType<string>(registryUrl());
expectType<string>(registryUrl('@myco'));
