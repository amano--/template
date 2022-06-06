import React from 'react'
import { NextComponentType, NextPageContext } from 'next'
import { NextRouter } from 'next/router'
import { ChakraProvider } from '@chakra-ui/react'

// // 1. Import the extendTheme function
// import { extendTheme } from '@chakra-ui/react'

// // 2. Extend the theme to include custom colors, fonts, etc
// const colors = {
//   brand: {
//     900: '#1a365d',
//     800: '#153e75',
//     700: '#2a69ac',
//   },
// }

// const theme = extendTheme({ colors })

export type AppRenderProps = {
  pageProps: object
  err?: Error
  Component: NextComponentType<NextPageContext, AppRenderProps, object>
  router: NextRouter
}

export default function App({ Component, pageProps }: AppRenderProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
