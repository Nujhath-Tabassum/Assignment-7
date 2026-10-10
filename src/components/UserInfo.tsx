"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify";

const UserInfo = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [isSigningOut, setIsSigningOut] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Show toast when the user's name is updated
    const previousNameRef = useRef<string | undefined>(undefined);

    useEffect(() => {
        if (!user?.name) return;

        if (
            previousNameRef.current !== undefined &&
            previousNameRef.current !== user.name
        ) {
            toast.success("আপনার নাম সফলভাবে আপডেট হয়েছে!");
        }

        previousNameRef.current = user.name;
    }, [user?.name]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    const handleSignOut = async () => {
        setIsSigningOut(true);

        try {
            const { error } = await authClient.signOut();

            if (error) {
                toast.error("সাইন আউট করা যায়নি!");
                console.error("Sign out failed:", error);
                return;
            }

            setIsOpen(false);
            toast.success("সফলভাবে সাইন আউট হয়েছে!");
            router.refresh();
        } catch (error) {
            toast.error("সাইন আউট করা যায়নি!");
            console.error("Sign out failed:", error);
        } finally {
            setIsSigningOut(false);
        }
    };

    return (
        <div
            ref={dropdownRef}
            className="absolute right-6 top-2 z-50"
        >
            {user ? (
                <div className="relative">
                    {/* Profile Dropdown Trigger */}
                    <button
                        type="button"
                        onClick={() => setIsOpen((prev) => !prev)}
                        aria-expanded={isOpen}
                        aria-haspopup="menu"
                        className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#43884a]"
                    >
                        {/* Avatar */}
                        <div className="h-7 w-7 overflow-hidden rounded-lg bg-gray-100">
                            {user.image ? (
                                <Image
                                    src={user.image}
                                    alt={user.name || "User avatar"}
                                    width={28}
                                    height={28}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center bg-[#e8f0e8] text-sm font-semibold text-[#43884a]">
                                    {user.name?.charAt(0)?.toUpperCase() || "U"}
                                </div>
                            )}
                        </div>

                        {/* Name */}
                        <span className="max-w-24 truncate text-xs font-medium text-[#333333]">
                            {user.name}
                        </span>

                        {/* Dropdown Arrow */}
                        <svg
                            className={`h-3 w-3 text-gray-500 transition-transform ${
                                isOpen ? "rotate-180" : ""
                            }`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.22 7.22a.75.75 0 0 1 1.06 0L10 10.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 8.28a.75.75 0 0 1 0-1.06Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>

                    {/* Dropdown Menu */}
                    {isOpen && (
                        <div
                            role="menu"
                            className="absolute right-0 top-full mt-2 w-64 overflow-hidden rounded-2xl border border-[#e8e6e1] bg-[#fffdfb] p-2 shadow-lg"
                        >
                            {/* User Details */}
                            <div className="border-b border-[#eeeae5] px-3 py-2.5">
                                <p className="truncate text-xs font-semibold text-[#333333]">
                                    {user.name}
                                </p>

                                <p className="mt-1 truncate text-[11px] text-gray-500">
                                    {user.email}
                                </p>
                            </div>

                            {/* Profile Link */}
                            <Link
                                href="/profile"
                                role="menuitem"
                                onClick={() => setIsOpen(false)}
                                className="mt-1 flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-[#333333] transition hover:bg-gray-100"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="h-4 w-4 text-gray-500"
                                    aria-hidden="true"
                                >
                                    <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.42 0-8 2.24-8 5v2h16v-2c0-2.76-3.58-5-8-5Z" />
                                </svg>

                                আমার প্রোফাইল
                            </Link>

                            {/* Sign Out */}
                            <button
                                type="button"
                                role="menuitem"
                                onClick={handleSignOut}
                                disabled={isSigningOut}
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs text-red-500 transition hover:bg-red-50 disabled:opacity-60"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    className="h-4 w-4"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5m5 5H3"
                                    />
                                </svg>

                                {isSigningOut
                                    ? "সাইন আউট হচ্ছে..."
                                    : "সাইন আউট"}
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                /* Signed-out Buttons */
                <div className="flex items-center gap-5">
                    <Link
                        href="/sign-in"
                        className="text-xs font-semibold text-[#333333] transition hover:text-[#43884a]"
                    >
                        সাইন ইন
                    </Link>

                    <Link
                        href="/sign-up"
                        className="rounded-lg bg-[#43884a] px-4 py-2 text-xs font-semibold text-white shadow-[0_3px_0_#c7d8c8] transition hover:bg-[#36763d] active:translate-y-0.5 active:shadow-none"
                    >
                        সাইন আপ
                    </Link>
                </div>
            )}
        </div>
    );
};

export default UserInfo;