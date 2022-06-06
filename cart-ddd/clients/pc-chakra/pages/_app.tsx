import { ChakraProvider, createLocalStorageManager } from '@chakra-ui/react'
const manager = createLocalStorageManager('my-key')

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider colorModeManager={manager}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
