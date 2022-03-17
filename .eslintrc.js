const { off } = require('process');

module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb-base',
    'prettier',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  ignorePatterns: ['src/assets/**/*.js'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  rules: {
    'import/extensions': 'off',
    'import/resolver': 'off',
    'import/no-cycle': 'off',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'import/no-extraneous-dependencies': 'off',
    'class-methods-use-this': 'off',
    'react/display-name': 'off',
    'no-param-reassign': [
      'error',
      { props: true, ignorePropertyModificationsFor: ['state'] },
    ],

    '@typescript-eslint/no-unused-vars': [
      'error',
      { varsIgnorePattern: '^_.*', argsIgnorePattern: '^_.*' },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        radix: 'off',
        'no-undef': 'off',
        'no-use-before-define': 'off',
        'no-shadow': 'off',
        'no-redeclare': 'off',
        'react/prop-types': 'off',
        'no-unused-vars': 'off',
      },
    },
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
      },
    },

    {
      files: [
        '**/*.test.js',
        '**/*.test.jsx',
        '**/*.test.ts',
        '**/*.test.tsx',
        '**/*.testData.ts',
        '**/*.mock.js',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
