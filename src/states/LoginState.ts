import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

const ProfileState = atom({
    key: "ProfileState",
    default: {
        name: null,
        email: null,
    },
    effects_UNSTABLE: [persistAtom],
});

export const isLoggedInSelector = selector({
    key: "isLoggedInSelector",
    get: ({ get }) => {
        const profile = get(ProfileState);
        return profile.email !== null;
    },
});

export default ProfileState;