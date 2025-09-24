import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    files: ['**/*.spec.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
    }
  }
);