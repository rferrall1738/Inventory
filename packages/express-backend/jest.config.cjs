module.exports = {
    testEnvironment: "node", // Use Node.js test environment
    transform: {
      "^.+\\.js$": "babel-jest", // Use Babel to transform ESM to CommonJS
    },
  };
  