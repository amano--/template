import React from 'react'
import { NextComponentType, NextPageContext } from 'next'
import { NextRouter } from 'next/router'
import { QueryClient, QueryClientProvider } from 'react-query'

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
const queryClient = new QueryClient()

export type AppRenderProps = {
  pageProps: object
  err?: Error
  Component: NextComponentType<NextPageContext, AppRenderProps, object>
  router: NextRouter
}

export default function App({ Component, pageProps }: AppRenderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}
