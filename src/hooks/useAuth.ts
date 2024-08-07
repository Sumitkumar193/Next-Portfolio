import { toast } from "sonner";

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

    async function login(data: LoginData) : Promise<LoginData> {
        return new Promise((resolve) => {
            const resolveAfterDelay = () => resolve(data);
            setTimeout(resolveAfterDelay, 2000);
        });
    }

    async function signup(data: RegisterData): Promise<RegisterData> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(data);
                toast.success("Register Success", {
                    description: "Welcome to the family!",
                });
            }, 3000);
        });
    }

    return {
        login,
        signup,
    };
}