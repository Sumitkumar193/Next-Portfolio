import { cookies } from "next/headers";
import TokenHelper from '@/helpers/TokenHelper';
import { ProfileType } from '@/states/LoginState';
import HeaderNavbarClient from '@/components/Header/HeaderNavbarClient';

const HeaderNavbarServer = async () => {
    const allCookies = cookies();
    const accessToken = allCookies.get('accessToken')?.value;
    const profileCookie = allCookies.get('profile')?.value as string;

    let isLoggedIn = false;
    if (accessToken) {
        isLoggedIn = await TokenHelper.verifyToken(accessToken);
    }

    let profile: ProfileType | null = null;
    if (profileCookie) {
        profile = JSON.parse(atob(profileCookie));
    }

    return (
        <HeaderNavbarClient isLoggedIn={isLoggedIn} profile={profile} />
    );
};

export default HeaderNavbarServer;