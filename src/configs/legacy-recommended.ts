import type { Linter } from 'eslint';

export const legacyRecommended: Linter.LegacyConfig = {
  plugins: ['em-dash-checker'],
  rules: {
    'em-dash-checker/no-em-dash': 'warn',
  },
};
