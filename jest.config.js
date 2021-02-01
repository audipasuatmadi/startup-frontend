module.exports = {
  "testEnvironment": "node",
  "roots": [
    "<rootDir>"
  ],
  "preset": 'ts-jest',
  "setupFilesAfterEnv": ["<rootDir>/setupTests.ts"],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  "testPathIgnorePatterns": ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  "snapshotSerializers": ["enzyme-to-json/serializer"],

  "globals": {
    "ts-jest": {
      "tsconfig": "<rootDir>/tsconfig.jest.json"
    }
  }
}