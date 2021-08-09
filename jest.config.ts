
import type { Config } from '@jest/types';

/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */
const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  transform: {},
};

export default config;
