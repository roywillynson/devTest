import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import IndexPage from './pages/IndexPage'
import OtherPage from './pages/OtherPage'

// Extend Theme
const theme = extendTheme({
  styles: {
    global: (props: any) => ({
      a: {
        color: props.colorMode === 'dark' ? 'teal.300' : 'teal.500',
      },
      'ol, ul': {
        px: ['auto', '!important'],
      },
    }),
  },
})
// Router
const router = createBrowserRouter([
  {
    path: '/',
    element: <IndexPage />,
  },
  {
    path: '/other',
    element: <OtherPage />,
  },
])

export const App = () => (
  <ChakraProvider theme={theme}>
    <RouterProvider router={router} />
  </ChakraProvider>
)
