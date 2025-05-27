module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['react', '@typescript-eslint'],
  settings: {
    react: {
      version: 'detect', // 自动检测 React 版本
    },
  },
  rules: {
    // 'react/react-in-jsx-scope': 'off',  // 禁用此规则
  },
};