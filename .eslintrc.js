module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    // Thêm các quy tắc ESLint riêng nếu cần thiết
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
