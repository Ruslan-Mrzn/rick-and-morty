/** @type {import('stylelint').Config} */
export default {
  extends: [
    'stylelint-prettier/recommended',
    'stylelint-config-clean-order/error'
  ],
  customSyntax: 'postcss-scss',
  ignoreFiles: ['dist/**', 'dev-dist/**', 'node_modules/**']
};
