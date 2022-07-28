// module.exports = require('../../configs/min/eslint-preset')
module.exports = {
  ...require('../../configs/min/eslint-preset'),
  rules: {
    // コンパニオンオブジェクトパターンを使うので無効化
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': 'off',
    //　switch で網羅性チェックを使うので無効化
    'no-case-declarations': 'off',
    // 'no-unused-vars': 'off',
    // '@typescript-eslint/no-unused-vars': 'off',
    // 'unused-imports/no-unused-vars': 'off',
  },
}
