import { Head, Html } from "next/document";
import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect } from "react";
import * as gtag from "../lib/gtag";

export default function MyDocument() {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: any) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  return (
    <Html lang='ko'>
      <Head>
        <meta
          name='google-site-verification'
          content='UBbrn6uYlvgqUuPSNz6397TblWqGKuSHzwf_e2jijxk'
        />
        <meta
          name='naver-site-verification'
          content='5b4676776e4bf7929cd196996b0da94331749653'
        />
        <link
          rel='alternate'
          type='application/rss+xml'
          href='/rss.xml'
          title='RSS'
        />
        <link
          rel='alternate'
          type='application/atom+xml'
          href='/rss-atom.xml'
          title='RSS Atom'
        />
        <link
          rel='alternate'
          type='application/json'
          href='/feed.json'
          title='JSON Feed'
        />
        <script
          // eslint-disable-next-line react/no-danger
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
        <Script
          strategy='afterInteractive'
          src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
        />
      </Head>
    </Html>
  );
}
