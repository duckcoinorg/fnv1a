import typescriptEslintParser from '@typescript-eslint/parser';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';

export default [
  {
    ignores: ['**/node_modules/**', '**/dist/**', '**/coverage/**']
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
      },
      globals: {
        // Node.js globals
        process: 'readonly',
        module: 'readonly',
        require: 'readonly',
        // Jest globals
        jest: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly'
      }
    },
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin
    },
    rules: {
      ...typescriptEslintPlugin.configs.recommended.rules,
    }
  }
]; 