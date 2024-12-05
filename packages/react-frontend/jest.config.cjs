module.exports = {
    testEnvironment: 'jest-environment-jsdom', // Explicitly specify the environment
    setupFilesAfterEnv: ['@testing-library/jest-dom'],
    transform: {
      '^.+\\.(js|jsx)$': 'babel-jest',
    },
    moduleNameMapper: {
      '\\.(css|scss)$': 'identity-obj-proxy',
    },
  };
  