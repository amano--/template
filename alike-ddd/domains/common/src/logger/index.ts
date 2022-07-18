import type { Logger, Configuration } from 'log4js'
// import * as log4js from 'log4js'

type LoggerMin = Pick<Logger, 'debug' | 'info'>

const log = (category: string, header: string, msgs: any[]) => console.log(category + '#' + header, ...msgs)

const newLoggerMin = (category: string): LoggerMin => ({
  debug(message, ...args) {
    log(category, message, args)
  },
  info(message, ...args) {
    log(category, message, args)
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

// 一括文字列変換に対応するためすこしトリッキーな設定をしている
const projectName = '@alike-ddd'.substring(1) + '/'

export const pickLogCategory = (dirname: string) => {
  return dirname.substring(dirname.indexOf(projectName) + projectName.length)
}
