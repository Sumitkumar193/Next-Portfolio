"use client";
import { useState } from "react";
import Image from "next/image";
import { Sun, Moon } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import useSetTheme from "@/hooks/useSetTheme";
import ProfileState from "@/states/LoginState";
import { useRecoilValue } from "recoil";

export default function Profile() {
    const { logout } = useAuth();
    const { toggleTheme } = useSetTheme();
    const profile = useRecoilValue(ProfileState);
    const [popup, setPopup] = useState(false);

    return (
        <div aria-haspopup="true" className="cursor-pointer w-full flex items-center relative" onClick={() => setPopup(!popup)}>
            {popup ? (
                <ul className="p-2 w-40 border-r absolute rounded z-40 left-0 shadow sm:-mt-56 md:mt-56 ">
                    <li className="cursor-pointer text-sm leading-3 tracking-normal py-2 focus:outline-none">
                        <div className="flex items-center">
                            <Image className="dark:invert" src="/icons/profile.png" alt="profile" width={18} height={18} />
                            <span className="text-muted-foreground ml-2">My Profile</span>
                        </div>
                    </li>
                    <li onClick={toggleTheme} className="cursor-pointer text-sm leading-3 gap-2 tracking-normal mt-2 py-2 focus:outline-none flex items-center">
                        <Sun width={20} height={20} className="h-4 w-4 dark:rotate-90 dark:scale-0" />
                        <Moon width={20} height={20} className="absolute h-4 w-4 rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
                        <span className="hidden md:text-muted-foreground md:flex">Toggle theme</span>
                    </li>
                    <li onClick={logout} className="cursor-pointer text-sm leading-3 tracking-normal mt-2 py-2 focus:outline-none flex items-center">
                        <Image className="dark:invert" src="/icons/logout.png" alt="logout" width={18} height={18} />
                        <span className="text-muted-foreground ml-2">Logout</span>
                    </li>
                </ul>
            ) : (
                " "
            )}
            <Image
                className="rounded h-10 w-10 object-cover"
                src={profile?.avatar || "/avatars/default.png"}
                alt="profile"
                width={240}
                height={240}
            />
            <div className="flex flex-col items-start ml-2">
                <p className="text-muted-foreground text-sm ml-2">{profile?.name}</p>
                <p className="text-muted-foreground text-sm ml-2">{profile?.email}</p>
            </div>
        </div>
    )
}
