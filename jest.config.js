module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupTestFrameworkScriptFile: './src/testSetup.js',
  testPathIgnorePatterns: ['/node_modules/', '/scripts/']
};
