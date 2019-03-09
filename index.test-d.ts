import {expectType} from 'tsd-check';
import registryUrl from '.';

expectType<string>(registryUrl());
expectType<string>(registryUrl('@myco'));
