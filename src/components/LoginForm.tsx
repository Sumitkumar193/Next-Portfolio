"use client";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useAuth, { LoginData } from "@/hooks/useAuth";
import { LoginValidation } from "@/validations/LoginValidations";
import { FloatingLabelInput } from "./ui/InputLabel";
import { Button } from "./ui/button";

export default function LoginForm() {
	const { login } = useAuth();
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginData>({
		resolver: joiResolver(LoginValidation),
	});

	async function onSubmit(data: LoginData): Promise<void> {
		toast.promise(login(data), {
            loading: "Logging in...",
            success: (data: LoginData) => {
				router.push('/');
                return `Welcome back, ${data.email}`;
            },
            error: () => "Invalid email or password",
        });
	}

	return (
		<form
			method="post"
			className="flex flex-col items-center justify-center gap-2"
			onSubmit={handleSubmit(onSubmit)}
		>
			<h1 className="text-4xl font-bold">Login</h1>
			<FloatingLabelInput
				label="Email"
				{...register("email", { required: true })}
			/>
			{errors.email && (
				<span className="text-red-500">{errors.email.message}</span>
			)}

			<FloatingLabelInput
				type="password"
				label="Password"
				{...register("password", { required: true })}
			/>
			{errors.password && (
				<span className="text-red-500">{errors.password.message}</span>
			)}
			<Button
				disabled={isSubmitting}
				type="submit"
				className="p-2 m-2 border border-gray-300 rounded-md"
			>
				Login
			</Button>
			{errors.root && (
				<span className="text-red-500">{errors.root.message}</span>
			)}
		</form>
	);
}
