import { NextResponse, NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import ApiError from '@/errors/ApiError';

export const runtime = 'nodejs';

export async function middleware(req: NextRequest) {
    try {
        const cookieList = cookies();
        const accessToken = cookieList.get('accessToken')?.value;
        if (!accessToken) {
            throw new ApiError('Unauthorized', 401);
        }

        const decodedToken = decodeToken(accessToken);

        if (!decodedToken || decodedToken.exp < Date.now() / 1000) {
            throw new jwt.TokenExpiredError('Token expired', new Date());
        }

        //Implement your own logic to validate the access token
        
        return NextResponse.next();
    } catch (error) {
        console.error(error);
        if (error instanceof jwt.TokenExpiredError || error instanceof ApiError) {
            return NextResponse.redirect(new URL("/login", req.nextUrl));
        }
        return NextResponse.redirect(new URL("/", req.nextUrl));
    }
}

type DecodedToken = {
    'userId': string;
    'tokenId': string;
    'exp': number;
    'iat': number;
};

function decodeToken(token: string): DecodedToken | null {
    return jwt.decode(token) as DecodedToken;
}

export const config = {
    matcher: [
        '/',
    ]
}