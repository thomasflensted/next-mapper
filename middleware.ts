import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './auth';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const isLoggedIn = await auth();
    if (!isLoggedIn)
        return NextResponse.redirect(new URL('/', request.url))
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/maps/:id*'
}