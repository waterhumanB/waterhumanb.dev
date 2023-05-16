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
      </Head>
    </Html>
  );
}
