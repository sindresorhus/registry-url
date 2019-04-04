import {expectType} from 'tsd';
import registryUrl = require('.');

expectType<string>(registryUrl());
expectType<string>(registryUrl('@myco'));
