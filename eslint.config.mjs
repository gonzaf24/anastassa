import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import jsx from 'eslint-plugin-react';

export default [
  js.configs.recommended,
  {
    ignores: ['node_modules', '.next', 'dist', 'build'],
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: {
        HTMLFormElement: true,
        console: true,
        FormData: true,
        HTMLDivElement: true,
        URL: true,
        module: true,
        Response: true,
        Request: true,
        File: true,
        HTMLInputElement: true,
        document: true,
        FileList: true,
        fetch: true,
      },
      parser: parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      react: jsx,
      import: importPlugin,
      prettier: prettier,
    },
    extends: ['plugin:prettier/recommended'],
    rules: {
      'prettier/prettier': [
        'error',
        {
          printWidth: 120, // Usa el mismo valor que tienes en Prettier
          tabWidth: 4,
          endOfLine: 'auto',
        },
      ],
    },
  },
];
