import type { AppProps } from 'next/app'

import { AppBar } from '../components/navigation/AppBar'
import { NotificationContextProvider } from '../context/notification'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NotificationContextProvider>
      <AppBar />
      <Component {...pageProps} />
    </NotificationContextProvider>
  )
}

export default MyApp
