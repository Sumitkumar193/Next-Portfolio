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

    async function login(data: LoginData) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(data);
            }, 2000);
        });
    }

    async function register(data: RegisterData) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(data);
            }, 3000);
        });
    }

    return {
        login,
        register,
    };
}