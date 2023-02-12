module.exports = {
    collectCoverage: false,
    collectCoverageFrom: [
        "src/**/*.{js,jsx}",
        "!src/redux/**/*.js",
    ],
    coverageThreshold: {
      "global": {
        "lines": 90
      }
    },
    coverageDirectory: 'coverage',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {
        '\\.(css|scss)$':"identity-obj-proxy"
    },
}