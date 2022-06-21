// import Document, { Head, Html, Main, NextScript } from 'next/document'
import { Head, Html, Main, NextScript } from 'next/document'

// server components를 적용하기 위해서 document의 형식을 함수형으로 변경하였다.
export default function MyDocument() {
  console.log('DOCUMENT IS RUNNING')
  return (
    <Html lang="ko">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

/* class CustomDocument extends Document {
  render(): JSX.Element {
    console.log('DOCUMENT IS RUNNING')
    return (
      <Html lang="ko">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default CustomDocument */
