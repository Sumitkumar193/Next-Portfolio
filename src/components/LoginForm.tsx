"use client";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import useAuth, { LoginData } from "@/hooks/useAuth";
import { LoginValidation } from "@/validations/LoginValidations";
import { Input } from "./ui/input";

export default function LoginForm() {
	const { login } = useAuth();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginData>({
		resolver: joiResolver(LoginValidation),
	});

	console.log(errors);

	function onSubmit(data: LoginData): void {
		login(data);
	}

	return (
		<>
			<h1 className="text-4xl font-bold">Login</h1>
			<form
				className="flex flex-col items-center justify-center"
				onSubmit={handleSubmit(onSubmit)}
			>
				<Input
					type="text"
					placeholder="Email"
					className="p-2 m-2 border border-gray-300 rounded-md"
					{...register("email", { required: true })}
				/>
				{errors.email && (
					<span className="text-red-500">{errors.email.message}</span>
				)}
				<Input
					type="password"
					placeholder="Password"
					className="p-2 m-2 border border-gray-300 rounded-md"
					{...register("password", { required: true })}
				/>
				{errors.password && (
					<span className="text-red-500">
						{errors.password.message}
					</span>
				)}
				<button
					type="submit"
					className="p-2 m-2 border border-gray-300 rounded-md"
				>
					Login
				</button>
				{errors.root && (
					<span className="text-red-500">{errors.root.message}</span>
				)}
			</form>
		</>
	);
}
