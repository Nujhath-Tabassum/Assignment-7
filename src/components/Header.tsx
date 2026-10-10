import Image from "next/image";
import logo from "../../public/logo-icon.png";
import React from "react";
import NavLinks from "./NavLinks";
import UserInfo from "./UserInfo";

const date = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
});

const Header = async () => {
    const res = await fetch(
        "https://api.abcz.workers.dev/api/bazardor/categories",
        {
            cache: "force-cache",
        }
    );

    const navs = await res.json();

    return (
        <div className="relative mx-auto my-3 w-full max-w-6xl px-3 py-2 sm:my-5 sm:px-5 md:px-6 lg:px-0">

            {/* Logo + User */}
            <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-3 pb-5 sm:flex-nowrap sm:pb-8">

                {/* Logo and title */}
                <div className="flex min-w-0 items-center gap-2 sm:gap-3">

                    <div className="shrink-0 rounded-lg bg-green-600 p-1.5 sm:rounded-xl sm:p-2">
                        <Image
                            src={logo}
                            width={38}
                            height={38}
                            alt="Logo"
                            className="h-7 w-7 object-contain sm:h-9.5 sm:w-9.5"
                        />
                    </div>

                    <div className="min-w-0">
                        <div className="text-xl font-bold leading-tight sm:text-3xl">
                            বাজার দর
                        </div>

                        <div className="mt-1 text-[10px] leading-relaxed text-gray-500 sm:text-sm">
                            {date}
                        </div>
                    </div>

                </div>

                {/* User */}
                <div >
                    <UserInfo />
                </div>

            </div>

            {/* Navigation */}
            <div className="w-full min-w-0">
                <NavLinks navs={navs} />
            </div>

        </div>
    );
};

export default Header;