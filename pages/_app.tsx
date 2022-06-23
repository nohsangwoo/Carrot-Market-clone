import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import Script from 'next/script'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) => fetch(url).then(response => response.json()),
        // 일정 주기로 새로고침 하고싶다.
        // refreshInterval: 2000,
      }}
    >
      <div className="mx-auto w-full max-w-xl">
        <Component {...pageProps} />
      </div>
      <Script
        src="https://developers.kakao.com/sdk/js/kakao.js"
        strategy="lazyOnload"
      />
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        // 스크립트를 다 다운받으면 실행하는 함수
        onLoad={() => {
          // @ts-ignore
          window.fbAsyncInit = function () {
            // @ts-ignore
            FB.init({
              appId: 'your-app-id',
              autoLogAppEvents: true,
              xfbml: true,
              version: 'v13.0',
            })
          }
        }}
      />
    </SWRConfig>
  )
}

export default MyApp
