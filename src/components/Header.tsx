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
        <div className="relative my-5 max-w-6xl mx-auto py-2">

            {/* Logo + User */}
            <div className="flex items-center pb-8 justify-between">

                {/* Logo and title */}
                <div className="flex gap-3 items-center">

                    <div className="bg-green-600 p-2 rounded-xl">
                        <Image
                            src={logo}
                            width={38}
                            height={38}
                            alt="Logo"
                        />
                    </div>

                    <div>
                        <div className="text-3xl font-bold">
                            বাজার দর
                        </div>

                        <div className="text-gray-500">
                            {date}
                        </div>
                    </div>

                </div>

                {/* User */}
                <UserInfo />

            </div>

            {/* Navigation */}
            <NavLinks navs={navs} />

        </div>
    );
};

export default Header;