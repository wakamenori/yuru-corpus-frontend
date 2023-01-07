// eslint-disable-next-line import/no-unresolved
import { Analytics } from '@vercel/analytics/react'
import type { AppProps } from 'next/app'

import { GA } from '../components/GA'
import { AppBar } from '../components/navigation/AppBar'
import { HistoryContextProvider } from '../context/history'
import { NotificationContextProvider } from '../context/notification'
import { SearchContextProvider } from '../feature/search/context/search'
import { usePageView } from '../hooks/use-page-view'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  usePageView()
  return (
    <HistoryContextProvider>
      <NotificationContextProvider>
        <SearchContextProvider>
          <GA/>
          <Analytics />
          <AppBar />
          <Component {...pageProps} />
        </SearchContextProvider>
      </NotificationContextProvider>
    </HistoryContextProvider>
  )
}

export default MyApp
