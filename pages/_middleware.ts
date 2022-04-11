import type { NextRequest, NextFetchEvent } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  console.log('it works! global middleware')
  console.log(req.ua)
  if (req.ua?.isBot) {
    return new Response("Plz don't be a bot, Be human", { status: 403 })
  }
  console.log(req.url)
  if (!req.url.includes('/api'))
    if (!req.url.includes('/enter') && !req.cookies.carrotsession)
      return NextResponse.redirect('/enter')

  console.log('geo: ', req.geo)
}
