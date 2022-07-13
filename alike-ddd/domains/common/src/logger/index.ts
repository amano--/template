import * as log4js from 'log4js'

//TBD テスト、本番環境ごとのログ設定方法をどうするかの検討
log4js.configure({
  appenders: {
    console: {
      type: 'console',
      level: 'all',
    },
  },
  categories: {
    default: {
      appenders: ['console'],
      level: 'all',
    },
  },
})

export const assignLogger = (name: string) => log4js.getLogger(name)
