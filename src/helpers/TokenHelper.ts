import jwt from 'jsonwebtoken';
import prisma from '@/db/client';

export default class TokenHelper {
    static async generateToken(UserID: string) {
        const tokenId = crypto.randomUUID();

        const token = jwt.sign(
            {
                userId: UserID,
                tokenId,
            },
            process.env.JWT_SECRET as string,
            {
                expiresIn: '1d'
            }
        );

        await prisma.userToken.create({
            data: {
                tokenId,
                userId: UserID,
                revoked: false,
            }
        });

        return token;
    }

    static async revokeToken(TokenID: string) {
        await prisma.userToken.updateMany({
            where: {
                tokenId: TokenID
            },
            data: {
                revoked: true
            }
        });
        return true;
    }

    static getTokenFromHeader(cookies: string | null) {
        const cookieList = cookies?.split(';').reduce((acc, cookie) => {
            const [key, value] = cookie.split('=');
            acc[key.trim()] = value;
            return acc;
        }, {} as { [key: string]: string });

        if (!cookieList) {
            return null;
        }
        const token = cookieList.accessToken;
        return token;
    }        
}