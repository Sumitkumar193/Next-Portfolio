import { useSetRecoilState } from "recoil";
import ProfileState from "@/states/LoginState";
import { useRouter } from "next/navigation";

export type LoginData = {
    email: string;
    password: string;
};

export type RegisterData = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export default function useAuth() {
    const setProfile = useSetRecoilState(ProfileState);
    const router = useRouter();

    async function login(data: LoginData) : Promise<LoginData> {
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error("Invalid email or password");
        }

        const json = await response.json();
        setProfile(json.data);
        router.push("/");
        return data;
    }

    async function signup(data: RegisterData): Promise<RegisterData> {
        const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error("Invalid email or password");
        }

        const json = await response.json();
        setProfile(json.data);
        router.push("/");
        return data;
    }

    async function logout() {
        const response = await fetch("/api/auth/logout", {
            method: "POST",
        });

        if (!response.ok) {
            throw new Error("Failed to logout");
        }

        setProfile(null);
        router.push("/login");
        const data = await response.json();
        return data;
    }

    return {
        login,
        signup,
        logout
    };
}