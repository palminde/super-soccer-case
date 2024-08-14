import type { Config } from '@jest/types';

/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

const config: Config.InitialOptions = {
  // Assume CI environment: snapshot update will fail the test
  ci: true,
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
  // A preset that is used as a base for Jest's configuration
  preset: 'ts-jest',
  // A list of paths to directories that Jest should use to search for files in
  roots: ['src'],
  // The test environment that will be used for testing
  testEnvironment: 'node',
  // Indicates whether each individual test should be reported during the run
  verbose: true,
};

export default config;
