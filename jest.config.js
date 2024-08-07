// jest.config.js
module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  testMatch: [
    '**/test/unit/**/*.test.js',
    '**/test/integration/**/*.test.js'
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
};
