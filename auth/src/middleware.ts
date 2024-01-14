import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

import { verifyJWT } from './lib/verifyJWT'

 
export async function middleware(request: NextRequest) {


    const path = request.nextUrl.pathname

    const isPublic = path === '/auth/login' || path === '/auth/register' || path === '/'
    
    const cookieStore = cookies()
    const JWT = cookieStore.get('jwt')?.value

    const decodedToken = jwt.decode(
        cookieStore.get('jwt')?.value as string,
        {complete: true}
    )
 
    const roles: any = decodedToken?.payload

    const isValid = await verifyJWT()

    if(path === '/auth/login' && JWT) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    if(isPublic && !isValid) {
        return NextResponse.next()
    }

    if(isPublic && JWT) {
       return NextResponse.next()
    }

    if(!isPublic && !JWT) {
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    // allow only admin to access admin routes  
    if(path.startsWith('/Admin') && isValid === false || roles?.role[0] != 'Admin') {
        return NextResponse.redirect(new URL('/UnAuth', request.url))
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