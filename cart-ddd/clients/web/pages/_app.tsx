// import React from 'react'
import { NextComponentType, NextPageContext } from 'next'
import { NextRouter } from 'next/router'
import { ChakraProvider } from '@chakra-ui/react'

import theme from '../src/theme'

export type AppRenderProps = {
  pageProps: object
  err?: Error
  Component: NextComponentType<NextPageContext, AppRenderProps, object>
  router: NextRouter
}
//参考 [ Next.jsでChakraUIを使用しようとしたら useSystemColorMode のエラーが出たので解決 ](https://zenn.dev/estra/articles/nextjs-chakraui-error-usesysmtecolormode)
function MyApp({ Component, pageProps }: AppRenderProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
export default MyApp
