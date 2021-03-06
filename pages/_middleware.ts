import type { NextRequest, NextFetchEvent } from 'next/server'
import { NextResponse } from 'next/server'
const middleware = (req: NextRequest, evt: NextFetchEvent) => {
  console.log('req : ', req)
  console.log('you are bot : ', req.ua?.isBot)
  console.log('req.page : ', req.page)
  if (req.ua?.isBot) {
    return new Response('Not bot plz', { status: 403 })
  } else if (req.ua?.isBot !== undefined) {
    // middleware error handling
    if (!req.url.includes('/api')) {
      if (!req.url.includes('/enter') && !req.cookies.carrotsession) {
        const url = req.nextUrl.clone()
        url.pathname = '/enter'
        return NextResponse.rewrite(new URL('/enter', req.url))
      }
    }
  }
}
export { middleware }
