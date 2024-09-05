import { atom, selector } from "recoil";

type Profile = {
    id?: string;
    name: string;
    email: string;
};

function getProfileFromCookies(): Profile | null {
    try {
        if (typeof window === "undefined") throw new Error("No window object");
        const cookies = document.cookie.split("; ");
        const profileCookie = cookies.find((cookie) => cookie.startsWith("profile="));
        if (!profileCookie) throw new Error("No profile cookie");
        const profile: Profile = JSON.parse(atob(profileCookie.split("=")[1]));
        return profile;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const ProfileState = atom({
    key: "ProfileState",
    default: getProfileFromCookies(),
});

export const isLoggedInSelector = selector({
    key: "isLoggedInSelector",
    get: ({ get }) => {
        const profile = get(ProfileState);
        return !!profile;
    },
});

export default ProfileState;