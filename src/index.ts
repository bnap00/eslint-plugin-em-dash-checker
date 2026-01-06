import type { ESLint, Linter } from 'eslint';
import { rules } from './rules/index.js';
import { createRecommendedConfig } from './configs/recommended.js';
import { legacyRecommended } from './configs/legacy-recommended.js';

const plugin: ESLint.Plugin & {
  configs: {
    recommended: Linter.Config[];
    'flat/recommended': Linter.Config[];
    'legacy-recommended': Linter.LegacyConfig;
  };
} = {
  meta: {
    name: 'eslint-plugin-em-dash-checker',
    version: '1.0.0',
  },
  rules,
  configs: {} as {
    recommended: Linter.Config[];
    'flat/recommended': Linter.Config[];
    'legacy-recommended': Linter.LegacyConfig;
  },
};

const recommendedConfig = createRecommendedConfig(plugin);
plugin.configs = {
  recommended: recommendedConfig,
  'flat/recommended': recommendedConfig,
  'legacy-recommended': legacyRecommended,
};

export default plugin;
export { rules };
