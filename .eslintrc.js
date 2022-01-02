module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  extends: [
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'prettier',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        ignoreRestSiblings: true,
      },
    ],
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/no-empty-function': 0,
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    'jsx-quotes': ['error', 'prefer-single'],
    'comma-dangle': ['error', 'always-multiline'],
    'prefer-destructuring': [
      'error',
      { array: true, object: true },
      { enforceForRenamedProperties: false },
    ],
    'prefer-template': 'error',
    'no-useless-rename': 'error',
    'no-trailing-spaces': 'error',
    semi: ['error', 'always'],
    eqeqeq: ['error', 'always'],
    'no-else-return': 'error',
    'no-extra-bind': 'error',
    'no-useless-return': 'error',
    'no-lonely-if': 'error',
    'new-parens': 'error',
    'no-multiple-empty-lines': 'error',
    'no-unneeded-ternary': 'error',
    'no-whitespace-before-property': 'error',
    'arrow-spacing': 'error',
    'no-var': 'error',
    'template-curly-spacing': ['error', 'never'],
    'space-before-blocks': ['error', 'always'],
    'no-unused-expressions': 0,
    'no-console': 'warn',
    '@typescript-eslint/no-explicit-any': 0,
    curly: 2,
  },
};
