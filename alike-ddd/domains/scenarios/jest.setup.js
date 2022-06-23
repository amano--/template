const Log4js = require('log4js')
Log4js.configure({
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
