import { AppProps } from "next/app"
import Head from "next/head"
import "./styles.css"
import { CMS_NAME } from "../constants"

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to {CMS_NAME}</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
    </>
  )
}

export default App
