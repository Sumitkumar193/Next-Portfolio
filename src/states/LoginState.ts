import { atom, selector } from "recoil";

const getProfileFromCookies = () => {
    if (typeof window === "undefined") return null;
    const cookies = document.cookie.split("; ");
    const profileCookie = cookies.find((cookie) => cookie.startsWith("profile="));
    if (!profileCookie) return null;
    const profile = JSON.parse(atob(profileCookie.split("=")[1]));
    return profile;
};

const ProfileState = atom({
    key: "ProfileState",
    default: getProfileFromCookies(),
});

export const isLoggedInSelector = selector({
    key: "isLoggedInSelector",
    get: ({ get }) => {
        const profile = get(ProfileState);
        return !!profile?.email;
    },
});

export default ProfileState;