import { Head, Html } from "next/document";

export default function MyDocument() {
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
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        {process.env.NODE_ENV !== "development" && (
          <script
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
              `,
            }}
          />
        )}
      </Head>
    </Html>
  );
}
