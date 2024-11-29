import { APP_ADMIN_PATH, APP_TRAINER_PATH, APP_USER_PATH } from '@helpers'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  // const url = req.nextUrl.clone()

  // if (req.nextUrl.pathname.startsWith(APP_ADMIN_PATH)) {
  //   return NextResponse.rewrite(new URL('/', req.url))
  //   // return NextResponse.next()
  // }

  // const PUBLIC_FILE = /\.(.*)$/
  // console.log(req.nextUrl.pathname, ' =========> ', PUBLIC_FILE.test(req.nextUrl.pathname))

  const isAdminRoutes: boolean = req.nextUrl.pathname.startsWith(APP_ADMIN_PATH)
  const isTrainerRoutes: boolean = req.nextUrl.pathname.startsWith(APP_TRAINER_PATH)
  const isUserRoutes: boolean = req.nextUrl.pathname.startsWith(APP_USER_PATH)
  const isCredential = isAdminRoutes || isTrainerRoutes || isUserRoutes

  const isAuthRoutes: boolean = /^(\/(admin|user|trainer)\/(login|register|password)\/?\w*)/g.test(
    req.nextUrl.pathname
  )
  // const isPublicPaths: boolean = /^(\/(public)\/\w+)|(\/(policy|terms)$)?/g.test(
  //   req.nextUrl.pathname
  // )

  const prefix: any = req.nextUrl.pathname?.slice(1)?.split('/')?.[0] || ''
  const cookieStore = await cookies()
  const hasToken =
    cookieStore?.has(`token_${prefix}`) && Boolean(cookieStore?.get(`token_${prefix}`)?.value)

  if (isCredential && !isAuthRoutes && !hasToken) {
    if (isAdminRoutes) {
      const params = req.nextUrl.pathname?.replace(`${APP_ADMIN_PATH}/`, '') + req.nextUrl.search
      return NextResponse.redirect(
        new URL(`${APP_ADMIN_PATH}/login?request=${btoa(params)}`, req.nextUrl)
      )
    } else if (isTrainerRoutes) {
      const params = req.nextUrl.pathname?.replace(`${APP_TRAINER_PATH}/`, '') + req.nextUrl.search
      return NextResponse.redirect(
        new URL(`${APP_TRAINER_PATH}/login?request=${btoa(params)}`, req.nextUrl)
      )
    } else if (isUserRoutes) {
      const params = req.nextUrl.pathname?.replace(`${APP_USER_PATH}/`, '') + req.nextUrl.search
      return NextResponse.redirect(
        new URL(`${APP_USER_PATH}/login?request=${btoa(params)}`, req.nextUrl)
      )
    } else {
      return NextResponse.redirect(new URL('/', req.nextUrl))
    }
  } else if (isAuthRoutes && hasToken) {
    const params: any = req.nextUrl.searchParams
    const requestParam: any = await params.get('request')
    return NextResponse.redirect(new URL(requestParam ? atob(requestParam) : '/', req.url))
  }
  return NextResponse.next()
}

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|media|logo|sitemap.xml|robots.txt).*)'],
}
