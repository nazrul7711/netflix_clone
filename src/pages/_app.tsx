import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {Roboto} from "next/font/google"
import {SessionProvider} from "next-auth/react"

const roboto = Roboto({
  subsets:['latin'],
  weight:['400',"700"]
})

export default function App({ Component, pageProps:{session,...pageProps} }: AppProps) {
  return (
    <SessionProvider session={session}>
      <div className={roboto.className}>
        <Component {...pageProps} />
      </div>
    // </SessionProvider>
  );
}
