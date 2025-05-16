import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const cookie = request.cookies.get('jwt');
    console.log('jwt cookie:', cookie);
    if (!cookie) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }
}

export const config = {
    matcher: '/raamen',
}