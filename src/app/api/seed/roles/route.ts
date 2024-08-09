import { NextResponse } from "next/server";
import prisma from "@/db/client";
import ApiError from "@/errors/ApiError";

export async function GET(request: Request) {
    try {
        const rolesToSeed = [
            {
                name: "Admin",
            },
            {
                name: "User",
            },
        ];

        const existingRoles = await prisma.role.findMany({
            where: {
                name: {
                    in: rolesToSeed.map(role => role.name),
                },
            },
        });

        const newRoles = rolesToSeed.filter(
            roleToSeed => !existingRoles.some(existingRole => existingRole.name === roleToSeed.name)
        );

        if (newRoles.length === 0) {
            throw new ApiError("No new roles to seed", 400);
        }

        await prisma.role.createMany({
            data: newRoles,
        });

        return NextResponse.json({
            success: true,
            message: "Roles seeded successfully",
        });
    } catch (error) {
        console.error(error);
        const typedError = error as { status?: number; message?: string };
        const response = {
            success: false,
            statusCode: typedError.status ?? 500,
            message: error instanceof ApiError ? error.message : "Internal server error",
        };
        return NextResponse.json({ message: response.message }, { status: response.statusCode });
    }
}