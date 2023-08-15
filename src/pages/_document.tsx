import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='ja'>
      <Head>
        <meta property='og:title' content='Puzzle and Programming' />
        <meta property='og:type' content='website' />
        <meta property='og:description' content='Reactでパズ◯ラ作ってみた' />
        <meta property='og:site_name' content='Puzzle and Programming' />
        {/* <meta property='og:image' content='' /> */}
        <meta property='og:locale' content='ja_JP' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
