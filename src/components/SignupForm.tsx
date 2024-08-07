"use client";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { FloatingLabelInput } from "./ui/InputLabel";
import useAuth, { RegisterData } from "@/hooks/useAuth";
import { RegisterValidation } from "@/validations/LoginValidations";

export default function SignupForm() {
	const { signup } = useAuth();
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<RegisterData>({
		resolver: joiResolver(RegisterValidation),
	});

	async function onSubmit(data: RegisterData): Promise<void> {
		toast.promise(signup(data), {
			loading: "Signing in...",
			success: (data: RegisterData) => {
				router.push("/");
				return `Welcome back, ${data.email}`;
			},
			error: () => "Invalid email or password",
		});
	}

	return (
		<form
			method="post"
			className="flex flex-col space-y-4"
			onSubmit={handleSubmit(onSubmit)}
		>
			<h1 className="text-4xl font-bold">Sign Up</h1>
			<FloatingLabelInput
				label="Name"
				{...register("name", { required: true })}
			/>
			{errors.name && (
				<span className="text-red-500">{errors.name.message}</span>
			)}

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

			<FloatingLabelInput
				type="password"
				label="Confirm Password"
				{...register("confirmPassword", { required: true })}
			/>

			{errors.confirmPassword && (
				<span className="text-red-500">
					{errors.confirmPassword.message}
				</span>
			)}

			<Button
				disabled={isSubmitting}
				type="submit"
				className="p-2 m-2 border border-gray-300 rounded-md"
			>
				Sign Up
			</Button>
			{errors.root && (
				<span className="text-red-500">{errors.root.message}</span>
			)}
		</form>
	);
}
