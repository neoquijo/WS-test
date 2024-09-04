export const preset = 'ts-jest';
export const testEnvironment = 'node';
export const testMatch = ['**/tests/**/*.test.ts'];
export const transform = {
  '^.+\\.ts$': ['ts-jest', {
    tsconfig: 'tsconfig.json', // Points to your TypeScript configuration file
  }],
};
export const moduleFileExtensions = ['ts', 'js'];
