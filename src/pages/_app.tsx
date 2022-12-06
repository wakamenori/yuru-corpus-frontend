import type { AppProps } from 'next/app'

import { Analytics } from '@vercel/analytics/react';
import { AppBar } from '../components/navigation/AppBar'
import { NotificationContextProvider } from '../context/notification'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NotificationContextProvider>
      <Analytics/>
      <AppBar />
      <Component {...pageProps} />
    </NotificationContextProvider>
  )
}

export default MyApp
