// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import prettier from 'eslint-config-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import storybook from 'eslint-plugin-storybook';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  globalIgnores(['dist', 'dev-dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite
    ],
    plugins: {
      '@stylistic': stylistic
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    },
    rules: {
      'no-console': 'error',
      'no-debugger': 'error',
      'no-alert': 'error',
      'react-hooks/set-state-in-effect': 'warn',

      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ],
      'no-undef': 'error',

      'default-param-last': 'error',
      'no-empty-function': 'warn',

      'no-dupe-keys': 'error',
      'no-sparse-arrays': 'error',

      'no-useless-concat': 'warn',
      'no-template-curly-in-string': 'error',

      'no-constant-condition': 'error',
      'no-unreachable': 'error',

      eqeqeq: ['error', 'always'],
      'no-implicit-coercion': 'warn',

      'no-throw-literal': 'error',

      complexity: ['warn', { max: 15 }],
      'max-depth': ['warn', 4],
      'max-params': ['warn', 4],

      'no-magic-numbers': [
        'warn',
        {
          ignore: [-1, 0, 1, 2, 100],
          ignoreArrayIndexes: true
        }
      ],
      'no-nested-ternary': 'warn',
      '@stylistic/padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
        {
          blankLine: 'any',
          prev: ['const', 'let', 'var'],
          next: ['const', 'let', 'var']
        },
        { blankLine: 'always', prev: 'directive', next: '*' },
        { blankLine: 'always', prev: 'block-like', next: '*' }
      ]
    }
  },
  {
    files: ['vite.config.ts', 'playwright.config.ts'],
    languageOptions: {
      globals: globals.node
    }
  },
  prettier,
  ...storybook.configs['flat/recommended']
]);
