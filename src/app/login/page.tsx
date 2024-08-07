"use client";
import { useEffect, useState } from "react";
import LoginForm from "@/components/LoginForm";
import SignupForm from "@/components/SignupForm";
import { Button } from "@/components/ui/button";

export default function Page() {
	const [isLogin, setIsLogin] = useState(true);
	const [formShow, setFormShow] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setFormShow(isLogin);
		}, 350);
	}, [isLogin]);

	return (
		<div className="flex gap-10 items-center justify-center h-[90vh]">
			<div className="overflow-hidden bg-[url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/sections-3.jpg)] bg-cover bg-no-repeat min-w-[850px] min-h-[500px] flex relative">
				<div
					className={`flex absolute h-full overflow-hidden transition-all delay-300 ease-in-out duration-1000 items-center bg-white justify-center w-[60%] ${
						isLogin ? "left-0" : "-left-[70%]"
					}`}
				>
					<div
						className={`${
							!formShow ? " translate-x-full" : "translate-x-0"
						} transition-transform duration-700 ease-in-out`}
					>
						<LoginForm />
					</div>
				</div>
				<div
					className={`absolute flex w-[40%] justify-center items-center z-20 ${
						isLogin ? "left-[60%]" : "left-0"
					} bg-transparent backdrop-blur-sm h-full delay-300 transition-all ease-in-out duration-1000`}
				>
					<Button
						className="relative min-w-20 overflow-hidden flex justify-center items-center"
						onClick={() => setIsLogin(!isLogin)}
					>
						<span
							className={`${
								isLogin ? "-top-20" : "top-2"
							} transition-all ease-in-out duration-1000 absolute`}
						>
							SignIn
						</span>
						<span
							className={`${
								isLogin ? "bottom-2" : "-bottom-20"
							} transition-all ease-in-out duration-1000 absolute`}
						>
							SignUp
						</span>
					</Button>
				</div>
				<div
					className={`flex absolute h-full overflow-hidden transition-all delay-300 ease-in-out duration-1000 items-center bg-white justify-center w-[60%] ${
						isLogin ? "left-[140%]" : "left-[40%]"
					}`}
				>
					<div
						className={`${
							formShow ? "-translate-x-full" : "translate-x-0"
						} transition-transform duration-700 ease-in-out`}
					>
						<SignupForm />
					</div>
				</div>
			</div>
		</div>
	);
}
