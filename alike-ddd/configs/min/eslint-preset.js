module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
  },
  extends: [
    'airbnb-typescript', //追加
    'airbnb/hooks', //追加
    'plugin:@typescript-eslint/recommended', //型を必要としないプラグインの推奨ルールをすべて有効
    'plugin:@typescript-eslint/recommended-requiring-type-checking', //型を必要とするプラグインの推奨ルールをすべて有効
    'plugin:@next/next/recommended',
    'plugin:import/recommended',
    'eslint:recommended',
    'eslint-config-prettier',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    // tsconfigRootDir: __dirname + "/../tsconfig", //追加 tsconfig.jsonがある相対パスを指定
    project: ['./tsconfig.json'], //追加  tsconfig.jsonを指定
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'unused-imports', //追加 使っていないimportを自動で削除用
    'jest',
  ],
  ignorePatterns: ['build'], //追加 .eslintignoreに対象外にしているが無いとコンパイルに時間がかかる
  rules: {
    'no-use-before-define': 'off', //関数や変数が定義される前に使われているとエラーになるデフォルトの機能をoff
    '@typescript-eslint/no-use-before-define': ['error'], //typescript側のno-use-before-defineを使うようにする
    'import/prefer-default-export': 'off', //named exportがエラーになるので使えるようにoff
    '@typescript-eslint/no-unused-vars': 'off', //unused-importsを使うため削除
    'unused-imports/no-unused-imports': 'error', //不要なimportの削除
    'unused-imports/no-unused-vars': [
      //unused-importsでno-unused-varsのルールを再定義
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    'react/function-component-definition': [
      //アロー関数以外受け付けない設定
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    // 'no-param-reassign': [2, { props: false }], //パラメーターのプロパティ変更を許可
    'import/extensions': [
      //importのときに以下の拡張子を記述しなくてもエラーにしない
      'error',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'react/jsx-filename-extension': [
      //jsx形式のファイル拡張子をjsxもしくはtsxに限定
      'error',
      {
        extensions: ['.jsx', '.tsx'],
      },
    ],
    'react/react-in-jsx-scope': 'off', //import React from 'react'が無くてもエラーを無くす
    'react/prop-types': 'off', //TypeScriptでチェックしているから不要。offにする
    'no-void': [
      //void演算子の許可
      'error',
      {
        allowAsStatement: true,
      },
    ],
    'react/jsx-props-no-spreading': 'off',
    'react/destructuring-assignment': 'off',
    // airbnb configuration buh対応 https://stackoverflow.com/questions/69928061/struggling-with-typescript-react-eslint-and-simple-arrow-functions-components
    'react/function-component-definition': [
      2,
      {
        // namedComponents: 'function-declaration',
        namedComponents: 'arrow-function',
      },
    ],
    // 以下独自設定
    // コンパニオンオブジェクトパターンを使うので無効化
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': 'off',
  },
  settings: {
    // ref to https://github.com/jsx-eslint/eslint-plugin-react#configuration
    react: {
      createClass: 'createReactClass', // Regex for Component Factory to use,
      // default to "createReactClass"
      pragma: 'React', // Pragma to use, default to "React"
      fragment: 'Fragment', // Fragment to use (may be a property of <pragma>), default to "Fragment"
      version: 'detect', // React version. "detect" automatically picks the version you have installed.
      // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
      // It will default to "latest" and warn if missing, and to "detect" in the future
      flowVersion: '0.53', // Flow version
    },
    'import/resolver': {
      //importするファイルをjsだけではなく、tsを含むファイルを許可する
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        // moduleDirectory: ['node_modules', 'src/'],
      },
    },
    next: {
      rootDir: ['apps/*/', 'packages/*/'],
    },
  },
}
