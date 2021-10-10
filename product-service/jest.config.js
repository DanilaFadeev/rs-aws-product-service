/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@libs/(.*)': '<rootDir>/src/libs/$1'
  },
  globals: {
    // Rewrite local environments to avoid real AWS Account usage
    AWS_PROFILE: 'import-service-test',
    AWS_ACCESS_KEY_ID: '',
    AWS_SECRET_ACCESS_KEY: '',
    AWS_DEFAULT_REGION: ''
  }
};