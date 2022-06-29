import type { Config } from '@jest/types';
import * as dotenv from '@next/env';
dotenv.loadEnvConfig(process.cwd(), process.env.NODE_ENV === 'development');
const config: Config.InitialOptions = {
  verbose: true,
  collectCoverageFrom: ['**/*.{js,jsx,ts,tsx}', '!**/*.d.ts', '!**/node_modules/**'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/test/',
    '/src/config/',
    '.styles.ts',
    'config.(js|ts)',
    '/.next/',
    'coverage/',
    'helpers/constants.ts',
    '/src/__tests__/',
  ],
  coverageDirectory: './coverage',
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/styles/(.*)$': '<rootDir>/styles/$1',
    '^@/__mocks__/(.*)$': '<rootDir>/src/__mocks__/$1',
    '^@/__tests__/(.*)$': '<rootDir>/src/__tests__/$1',
    '^@/domain/(.*)$': '<rootDir>/src/domain/$1',
    '^@/helpers/(.*)$': '<rootDir>/src/helpers/$1',
    '^@/layout/(.*)$': '<rootDir>/src/layout/$1',
    '^@/api/(.*)$': '<rootDir>/src/api/$1',
    '^@/pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@/containers/(.*)$': '<rootDir>/src/containers/$1',

    // Handle CSS imports (with CSS modules)
    // https://jestjs.io/docs/webpack#mocking-css-modules
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',

    // Handle CSS imports (without CSS modules)
    '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.ts',

    // Handle image imports
    // https://jestjs.io/docs/webpack#handling-static-assets
    '^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$/i': `<rootDir>/__mocks__/fileMock.ts`,
  },
  //  Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/', '__tests__/utils/'],
  testEnvironment: 'jsdom',
  transform: {
    // Use babel-jest to transpile tests with the next/babel preset
    // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  transformIgnorePatterns: ['/node_modules/', '^.+\\.module\\.(css|sass|scss)$'],
};
// eslint-disable-next-line import/no-default-export
export default config;
