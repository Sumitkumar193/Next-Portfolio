import { useToast } from "@/components/ui/use-toast";

export type LoginData = {
    email: string;
    password: string;
};

export type RegisterData = {
    name: string;
    email: string;
    password: string;
};

export default function useAuth() {
    const { toast } = useToast();

    async function login(data: LoginData) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(data);
                toast({
                    title: "Login Success",
                    description: "Welcome back!",
                })
            }, 2000);
        });
    }

    async function register(data: RegisterData) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(data);
                toast({
                    title: "Register Success",
                    description: "Welcome to the family!",
                });
            }, 3000);
        });
    }

    return {
        login,
        register,
    };
}