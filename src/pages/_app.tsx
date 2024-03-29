import "../styles/globals.scss"
import type { AppProps } from "next/app"
import { SWRConfig } from "swr"
import Script from "next/script"
import { DefaultSeo } from "next-seo"
import * as gtag from "../lib/gtag"
import { defaultMetaData } from "../../next-seo.config"

function MyApp({ Component, pageProps }: AppProps) {
  gtag.useGtag()

  const { fallback } = pageProps
  return (
    <SWRConfig value={{ fallback }}>
      <DefaultSeo {...defaultMetaData} />
      {process.env.NODE_ENV !== "development" && (
        <>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <Script
            strategy='afterInteractive'
            src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
          />
          <Script
            id='gtag-init'
            strategy='afterInteractive'
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gtag.GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </>
      )}
      <Component {...pageProps} />
    </SWRConfig>
  )
}

export default MyApp
