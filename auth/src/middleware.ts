import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

 
export function middleware(request: NextRequest) {


    const path = request.nextUrl.pathname

    const isPublic = path === '/auth/login'
    
    const cookieStore = cookies()
    const JWT = cookieStore.get('jwt')?.value

    if(isPublic && JWT) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    if(!isPublic && !JWT) {
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    const decodedToken = jwt.decode(
        JWT as string,
        {complete: true}
    )

    const roles: any = decodedToken?.payload

    if(!isPublic && JWT && roles.role[0] === 'admin' && path !== '/Admin') {
        return NextResponse.redirect(new URL('/Admin', request.url))
    }

}
 
// Supports both a single string value or an array of matchers
export const config = {
    matcher: [
        '/',
        '/home',
        '/auth/login',
        '/Admin/:path*'
    ],
}