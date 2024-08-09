import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/db/client";
import ApiError from "@/errors/ApiError";
import TokenHelper from "@/helpers/TokenHelper";


export async function POST(request: Request) {
    try {
        const { name, email, password, confirmPassword } = await request.json();

        if (password !== confirmPassword) {
            throw new ApiError('Passwords do not match', 400);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const role = await prisma.role.findFirst({
            where: {
                name: 'User'
            }
        });

        if (!role) {
            throw new ApiError('Role not found', 500);
        }

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                roleId: role.id
            }
        });

        const token = await TokenHelper.generateToken(user.id);

        const response = NextResponse.json({
            success: true,
            message: 'User created successfully',
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

        return response;
    } catch (error) {
        console.error(error);
        const typedError = error as { status?: number; message?: string };
        const response = {
            statusCode: typedError.status ?? 500,
            message: error instanceof ApiError ? error.message : 'Internal server error',
        };
        return NextResponse.json({ success: false, message: response.message }, { status: response.statusCode });
    }
}