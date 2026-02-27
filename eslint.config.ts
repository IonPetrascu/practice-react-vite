import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import { defineConfig, globalIgnores } from 'eslint/config';
import reactRefresh from 'eslint-plugin-react-refresh';

import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import reactHooks from 'eslint-plugin-react-hooks';

export default defineConfig([
  globalIgnores(['node_modules', 'dist', 'build', '.vite', 'public', '.config/*']),
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended, prettierConfig],
    files: ['src/**/*.{js,ts,jsx,tsx}'],
    plugins: {
      react: pluginReact,
      'react-refresh': reactRefresh,
      prettier: prettierPlugin,
    },
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
  {
    rules: {
      ...reactHooks.configs.recommended.rules,
      'prettier/prettier': 'error',
      // 'react/react-in-jsx-scope': 'off',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
    settings: {
      react: { version: 'detect' },
    },
  },
  reactHooks.configs.flat.recommended,
]);
