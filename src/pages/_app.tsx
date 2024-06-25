import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { LDProvider } from "launchdarkly-react-client-sdk"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LDProvider clientSideID="6679d46d0488e10fe66c75f8">
      <Component {...pageProps} />
    </LDProvider>
  )
}
