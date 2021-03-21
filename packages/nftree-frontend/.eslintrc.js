module.exports = {
  env: {
    browser: true,
  },
  extends: ['@infuse/eslint-config/typescript'],
  rules: {
    '@typescript-eslint/no-unused-vars': 1,
    'unused-imports/no-unused-imports-ts': 0,
    'max-len': 1,
    '@typescript-eslint/no-use-before-define': 0,
  },
};
