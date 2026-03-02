import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { locales } from './app/_locales'

export function middleware(request: NextRequest) {
  const url = new URL(request.url)
  const localeParam = url.searchParams.get('locale')

  const response = NextResponse.next()

  if (localeParam && Object.prototype.hasOwnProperty.call(locales, localeParam)) {
    response.cookies.set({
      name: 'locale',
      value: localeParam,
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
    })
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}

