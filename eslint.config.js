import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import prettier from 'eslint-config-prettier';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    },
    rules: {
  'no-console': 'error',           
  'no-debugger': 'error',        
  'no-alert': 'error',             
  
  'no-unused-vars': ['error', { 
    'argsIgnorePattern': '^_',
    'varsIgnorePattern': '^_'
  }],
  'no-undef': 'error',            
  
  'default-param-last': 'error',  
  'no-empty-function': 'warn',    
  
  'no-dupe-keys': 'error',        
  'no-sparse-arrays': 'error',    
  
  'no-useless-concat': 'warn',    
  'no-template-curly-in-string': 'error', 
  
  'no-constant-condition': 'error', 
  'no-unreachable': 'error',      
  
  'eqeqeq': ['error', 'always'],  
  'no-implicit-coercion': 'warn', 
  
  'no-throw-literal': 'error',    

  'complexity': ['warn', { max: 15 }],  
  'max-depth': ['warn', 4],             
  'max-params': ['warn', 4],           

  'no-magic-numbers': ['warn', { 
    ignore: [-1, 0, 1, 2, 100],        
    ignoreArrayIndexes: true
  }],
  'no-nested-ternary': 'warn',
    }
  },
  prettier
]);
