module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'plugin:jest/recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'linebreak-style': 0,
    'no-underscore-dangle': 0,
    'jest/no-test-callback': 0,
    'jest/no-done-callback': 0,
    'no-param-reassign': 0,
    camelcase: 0,
    'import/prefer-default-export': 0,
    'import/extensions': 0,
    'no-return-await': 0,
    'implicit-arrow-linebreak': 0,
    'no-new-wrappers': 0,
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
  },
};
