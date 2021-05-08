module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'plugin:cypress/recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'linebreak-style': 0,
    'react/no-array-index-key': 0,
    'react/react-in-jsx-scope': 0,
    'react/jsx-props-no-spreading': 0,
    'no-param-reassign': 0,
    'cypress/no-unnecessary-waiting': 0,
    'no-console ': 0,
    'react/prop-types': 0,
    'react/button-has-type': 0,
    'no-underscore-dangle': 0,
    'no-unused-vars': [1, { args: 'all' }],
    'no-shadow': 'off',
    camelcase: 'off',
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
  },
  overrides: [
    {
      files: ['src/setupTests.js'],
      rules: {
        'import/no-extraneous-dependencies': 0,
      },
    },
  ],
};
