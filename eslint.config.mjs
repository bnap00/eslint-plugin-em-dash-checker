import emDashChecker from './dist/index.mjs';

export default [
  ...emDashChecker.configs.recommended,
  {
    files: ['test-file.js'],
  },
];
