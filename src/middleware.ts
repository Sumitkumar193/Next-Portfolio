import { NextResponse, NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import ApiError from '@/errors/ApiError';
import TokenHelper from '@/helpers/TokenHelper';

export async function middleware(req: NextRequest) {
    try {
        const cookieList = cookies();
        const accessToken = cookieList.get('accessToken')?.value;
        if (!accessToken) {
            throw new ApiError('Unauthorized', 401);
        }

        const { payload } = TokenHelper.decodeToken(accessToken);

        if (!payload || payload.exp < Date.now() / 1000) {
            throw new ApiError('Unauthorized', 401);
        }

        console.log(payload, 'decodedToken');

        //Implement your own logic to validate the access token
        
        return NextResponse.next();
    } catch (error) {
        console.error(error);
        if (error instanceof ApiError) {
            return NextResponse.redirect(new URL("/login", req.nextUrl));
        }
        return NextResponse.redirect(new URL("/", req.nextUrl));
    }
}

export const config = {
    matcher: [
        '/',
        '/social',
    ]
}