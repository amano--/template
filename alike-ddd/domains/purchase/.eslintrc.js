// module.exports = require('../../configs/min/eslint-preset')
module.exports = {
  ...require('../../configs/min/eslint-preset'),
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
    'no-case-declarations': 'off',
    'no-unused-vars': 'off',
    'unused-imports/no-unused-vars': 'off',
  },
}
