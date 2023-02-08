import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { store } from '../src/store'
import { Provider } from 'react-redux'
import Layout from '@/components/Layout'

export default function App({ Component, pageProps }: AppProps) {

  return (
    <Provider store={store}>
      <Layout>
          <Head>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Dangrek" />
            <link href='https://fonts.googleapis.com/css?family=Fresca' rel='stylesheet' />
            <link href='https://fonts.googleapis.com/css?family=Pavanam' rel='stylesheet' />
          </Head>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}
