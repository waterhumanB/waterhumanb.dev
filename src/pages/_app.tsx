import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";

function MyApp({ Component, pageProps }: AppProps) {
  const { fallback } = pageProps;
  return (
    <SWRConfig value={{ fallback }}>
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;
