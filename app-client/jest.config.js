module.exports = {
    collectCoverage: false,
    collectCoverageFrom: [
        "",
        "src/**/*.{js,jsx}",
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