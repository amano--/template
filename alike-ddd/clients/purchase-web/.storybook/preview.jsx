import '../styles/globals.css'

import { RecoilRoot } from 'recoil'
import { QueryClient, QueryClientProvider } from 'react-query'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
export const decorators = [
  (Story) => (
    <RecoilRoot>
      <QueryClientProvider client={new QueryClient()}>
        <Story />
      </QueryClientProvider>
    </RecoilRoot>
  ),
]
