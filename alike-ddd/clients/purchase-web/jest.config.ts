// 参考 https://zenn.dev/miruoon_892/articles/e42e64fbb55137

import nextJest from 'next/jest'

const createJestConfig = nextJest({
  dir: './clients/purchase-web/',
})

// Jestのカスタム設定を設置する場所。従来のプロパティはここで定義。
const customJestConfig = {
  // jest.setup.jsを作成する場合のみ定義。
  setupFilesAfterEnv: ['<rootDir>/rtl.setup.ts'],
  // moduleNameMapper: {
  //   // aliaseを定義（tsconfig.jsonのcompilerOptions>pathsの定義に合わせる）
  //   '^@/components/(.*)$': '<rootDir>/components/$1',
  //   '^@/pages/(.*)$': '<rootDir>/pages/$1',
  // },
  testEnvironment: 'jest-environment-jsdom',
}
// createJestConfigを定義することによって、本ファイルで定義された設定がNext.jsの設定に反映されます
module.exports = createJestConfig(customJestConfig)
