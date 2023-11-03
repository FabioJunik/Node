module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'import/extensions': 0,
    'prefer-destructuring': 0,
    'no-underscore-dangle': 0,
  },
  overrides: [
    {
      files: [
        '*.test.js',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
