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
        return json.data;
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
        return json.data;
    }

    async function logout() {
        const response = await fetch("/api/auth/logout", {
            method: "POST",
        });

        if (!response.ok) {
            throw new Error("Failed to logout");
        }

        const data = await response.json();
        return data.data;
    }

    return {
        login,
        signup,
        logout
    };
}