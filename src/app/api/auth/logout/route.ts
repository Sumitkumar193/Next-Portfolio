import { NextResponse } from "next/server";
import TokenHelper from '@/helpers/TokenHelper';
import ApiError from "@/errors/ApiError";

export async function POST(request: Request) {
    try {
        const cookies = request.headers.get('cookie');
        const token = TokenHelper.getTokenFromHeader(cookies);

        if (!token) {
            throw new ApiError('Unauthorized', 401);
        }

        await TokenHelper.revokeToken(token);

        const response = NextResponse.json({
            success: true,
            message: 'Logout successful',
        });

        response.cookies.set('accessToken', '', {
            httpOnly: true,
            maxAge: 0,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
        });

        return response;
    } catch (error) {
        console.error(error);
        const typedError = error as { status?: number; message?: string };
        const response = {
            success: false,
            statusCode: typedError.status ?? 500,
            message: error instanceof ApiError ? error.message : 'Internal server error',
        };
        return NextResponse.json({ message: response.message }, { status: response.statusCode });
    }
}