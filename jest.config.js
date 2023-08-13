export default {
  preset: 'ts-jest',
	setupFilesAfterEnv: ['./setupTests.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  modulePaths: ['<rootDir>'],
  testEnvironment: 'jsdom',
};
