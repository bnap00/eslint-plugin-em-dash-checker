import type { Linter } from 'eslint';
import type { ESLint } from 'eslint';

export function createRecommendedConfig(plugin: ESLint.Plugin): Linter.Config[] {
  return [
    {
      name: 'em-dash-checker/recommended',
      plugins: {
        'em-dash-checker': plugin,
      },
      rules: {
        'em-dash-checker/no-em-dash': 'warn',
      },
    },
  ];
}
