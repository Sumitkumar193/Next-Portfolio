"use client";
import { useEffect, useState } from "react";
import LoginForm from "@/components/LoginForm";
import SignupForm from "@/components/SignupForm";
import { Button } from "@/components/ui/button";

export default function Page() {
    const [isLogin, setIsLogin] = useState(true);
    const [displayText, setDisplayText] = useState({
        head: "One of us?",
        subHead: "If you already has an account, just sign in. We've missed you!",
    });

    useEffect(() => {
        setTimeout(() => {
            setDisplayText({
                head: !isLogin ? "One of us?" : "New here?",
                subHead: !isLogin
                    ? "If you already has an account, just sign in. We've missed you!"
                    : "We are glad to see you here! Let's get started!",
            });
        }, 500);
    }, [isLogin]);

    return (
        <div className="flex gap-10 items-center justify-center h-[90vh]">
            <div className=" shadow-md overflow-hidden bg-[url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/sections-3.jpg)] bg-cover bg-no-repeat min-w-[55%] min-h-[70%] flex relative">
                <div
                    className={`absolute flex h-full overflow-hidden transition-all ease-in-out duration-1000 items-center bg-white justify-center w-[60%] ${
                        isLogin ? "left-0" : "left-full"
                    }`}
                >
                    <div
                        className="transition-transform duration-700 ease-in-out"
                    >
                        <LoginForm />
                    </div>
                </div>
                <div
                    className={`absolute flex flex-col w-[40%] justify-around items-center z-20 ${
                        isLogin ? "left-[60%]" : "left-0"
                    } bg-black bg-opacity-40 backdrop-blur-sm h-full transition-all ease-in-out duration-1000`}
                >
                    <div className="flex flex-col items-center justify-center max-w-72">
                        <h1 className="text-4xl font-bold text-white">
                        { displayText.head }
                        </h1>
                        <p className="text-white">
                            { displayText.subHead }
                        </p>
                    </div>

                    <Button
                        className="relative min-w-20 overflow-hidden flex justify-center items-center bg-transparent border-2 border-white rounded-full text-white hover:bg-transparent hover:shadow-lg"
                        onClick={() => setIsLogin(!isLogin)}
                    >
                        <span
                            className={`${
                                isLogin ? "-top-20" : "top-2"
                            } transition-all ease-in-out duration-1000 absolute`}
                        >
                            Sign In
                        </span>
                        <span
                            className={`${
                                isLogin ? "bottom-2" : "-bottom-20"
                            } transition-all ease-in-out duration-1000 absolute`}
                        >
                            Sign Up
                        </span>
                    </Button>
                </div>
                <div
                    className={`absolute flex h-full overflow-hidden transition-all ease-in-out duration-1000 items-center bg-white justify-center w-[60%] ${
                        isLogin ? "-left-full" : "left-[40%]"
                    }`}
                >
                    <div
                        className="transition-transform duration-700 ease-in-out"
                    >
                        <SignupForm />
                    </div>
                </div>
            </div>
        </div>
    );
}