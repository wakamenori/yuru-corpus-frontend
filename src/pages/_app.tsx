import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {AppBar} from '../components/navigation/AppBar'

function MyApp({Component, pageProps}: AppProps) {
  return <><AppBar/><Component {...pageProps} /></>
}

export default MyApp
