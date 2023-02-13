module.exports = {
    collectCoverage: false,
    collectCoverageFrom: [
        "src/**/*.{js,jsx}",
        "!src/redux/**/*.js",
        "!src/utils/test/*"
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