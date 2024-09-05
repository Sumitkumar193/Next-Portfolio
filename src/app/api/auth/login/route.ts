import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import TokenHelper from '@/helpers/TokenHelper';
import prisma from '@/db/client';
import ApiError from '@/errors/ApiError';

type LoginRequest = {
    email: string;
    password: string;
};

export async function POST(request: Request) {
    try {
        const { email, password }: LoginRequest = await request.json();

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (!user) {
            throw new ApiError('Invalid credentials', 401);
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            throw new ApiError('Invalid credentials', 401);
        }

        const token = await TokenHelper.generateToken(user.id);

        const response = NextResponse.json({
            success: true,
            message: 'Login successful',
            data: {
                name: user.name,
                email: user.email,
            }
        });

        response.cookies.set('accessToken', token, {
            httpOnly: true,
            maxAge: 60 * 60 * 24,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
        });

        response.cookies.set('profile', btoa(JSON.stringify({
            name: user.name,
            email: user.email,
        })), {
            maxAge: 60 * 60 * 24,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
        });

        return response;
    } catch (error) {
        const typedError = error as { status?: number; message?: string };
        const response = {
            success: false,
            statusCode: typedError.status ?? 500,
            message: error instanceof ApiError ? error.message : 'Internal server error',
        };
        return NextResponse.json({ message: response.message }, { status: response.statusCode });
    }
}