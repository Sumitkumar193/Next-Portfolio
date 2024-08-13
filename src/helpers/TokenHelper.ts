import { SignJWT, jwtVerify } from 'jose';
import prisma from '@/db/client';

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY as string);

type TokenPayload = {
    userId: string;
    tokenId: string;
    iat: number;
    exp: number;
}

type TokenHeader = {
    alg: string;
}
export default class TokenHelper {
    static async generateToken(UserID: string) {
        const tokenId = crypto.randomUUID();

        const token = await new SignJWT({
            userId: UserID,
            tokenId,
        })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('1d')
            .sign(secretKey);

        await prisma.userToken.create({
            data: {
                tokenId,
                userId: UserID,
                revoked: false,
            }
        });

        return token;
    }

    static async verifyToken(token: string): Promise<boolean> {
        try {
            const { payload } = await jwtVerify(token, secretKey, {
                algorithms: ['HS256'],
            });

            return !!payload;
        } catch (error) {
            return false;
        }
    }

    static decodeToken(token: string): { header: TokenHeader; payload: TokenPayload } {
        try {
            const [header, payload] = token.split('.').slice(0, 2);
            const decodedHeader = JSON.parse(atob(header));
            const decodedPayload = JSON.parse(atob(payload));
            return { header: decodedHeader, payload: decodedPayload };
        } catch (error) {
            console.error('Token decoding failed:', error);
            return {
                header: { alg: '' },
                payload: {
                    userId: '',
                    tokenId: '',
                    iat: 0,
                    exp: 0,
                }
            };
        }
    }

    static async revokeToken(TokenID: string): Promise<boolean> {
        try {
            await prisma.userToken.updateMany({
                where: {    
                    tokenId: TokenID
                },
                data: {
                    revoked: true
                }
            });
            return true;
        } catch (error) {
            console.error('Token revocation failed:', error);
            return false;
        }
    }

    static getTokenFromHeader(cookies: string) {
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