import type { Logger, Configuration } from 'log4js'
// import * as log4js from 'log4js'

type LoggerMin = Pick<Logger, 'debug' | 'info'>

const newLoggerMin = (category: string): LoggerMin => ({
  debug(message, ...args) {
    console.log(category, message)
  },
  info(message, ...args) {
    console.log(category, message)
  },
})

//TBD テスト、本番環境ごとのログ設定方法をどうするかの検討
const configMin: Configuration = {
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
}
const newLoggerForLog4js = (category: string) => {
  //TODO Browser上で実行するとエラーになってしまうので、とりあえず簡易Loggerを返している
  // log4js.configure(configMin)
  // return log4js.getLogger(category)
  return newLoggerMin(category)
}

// TODO Node 上で実行されている(Browser上で実行されていない) を確認するための良い方法
const isOnNode = false // process.cwd() ? true : false // process.browser

export const assignLogger = (
  category: string //newLoggerMin(category)
) => (isOnNode ? newLoggerForLog4js(category) : newLoggerMin(category))
