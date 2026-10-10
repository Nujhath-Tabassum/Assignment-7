"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProfilePage = () => {
    const router = useRouter();

    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const [name, setName] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);
    const [isSigningOut, setIsSigningOut] = useState(false);
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (user?.name) {
            setName(user.name);
        }
    }, [user?.name]);

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name.trim()) {
            setErrorMessage("আপনার নাম লিখুন।");
            setMessage("");
            return;
        }

        setIsUpdating(true);
        setMessage("");
        setErrorMessage("");

        try {
            const { error } = await authClient.updateUser({
                name: name.trim(),
            });

            if (error) {
                setErrorMessage(
                    error.message || "নাম আপডেট করা যায়নি। আবার চেষ্টা করুন।"
                );
                return;
            }

            setMessage("আপনার নাম সফলভাবে আপডেট হয়েছে।");
            router.refresh();
        } catch {
            setErrorMessage("নাম আপডেট করা যায়নি। আবার চেষ্টা করুন।");
        } finally {
            setIsUpdating(false);
        }
    };

    const handleSignOut = async () => {
        setIsSigningOut(true);
        setErrorMessage("");

        try {
            const { error } = await authClient.signOut();

            if (error) {
                setErrorMessage("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
                return;
            }

            router.push("/");
            router.refresh();
        } catch {
            setErrorMessage("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
        } finally {
            setIsSigningOut(false);
        }
    };

    if (isPending) {
        return (
            <main className="min-h-screen bg-[#f5f4f0] px-4 py-8">
                <div className="mx-auto max-w-3xl animate-pulse">
                    <div className="mb-6 h-7 w-40 rounded bg-gray-200" />
                    <div className="h-24 rounded-2xl border border-[#e8e6e1] bg-[#fffdfb]" />
                    <div className="mt-5 h-48 rounded-2xl border border-[#e8e6e1] bg-[#fffdfb]" />
                </div>
            </main>
        );
    }

    if (!user) {
        return (
            <main className="flex min-h-screen flex-col items-center justify-center bg-[#f5f4f0] px-4 text-center text-[#333333]">
                <h1 className="text-2xl font-bold">সাইন ইন করুন</h1>

                <p className="mt-2 text-sm text-gray-500">
                    আপনার প্রোফাইল দেখতে প্রথমে সাইন ইন করুন।
                </p>

                <Link
                    href="/signin"
                    className="mt-5 rounded-lg bg-[#43884a] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#36763d]"
                >
                    সাইন ইন
                </Link>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#f5f4f0] px-4 py-8 text-[#333333]">
            <div className="mx-auto max-w-3xl">
                {/* Page Heading */}
                <div className="mb-5">
                    <h1 className="text-xl font-bold">আমার প্রোফাইল</h1>

                    <p className="mt-1 text-xs text-gray-500">
                        আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
                    </p>
                </div>

                {/* User Information Card */}
                <section className="flex items-center justify-between gap-3 rounded-2xl border border-[#e8e6e1] bg-[#fffdfb] p-4 sm:p-5">
                    <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#f1efeb] sm:h-16 sm:w-16">
                            {user.image ? (
                                <img
                                    src={user.image}
                                    alt={`${user.name}'s profile`}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <span className="text-2xl font-bold text-[#43884a]">
                                    {user.name?.charAt(0)?.toUpperCase() || "U"}
                                </span>
                            )}
                        </div>

                        <div className="min-w-0">
                            <h2 className="truncate text-sm font-bold sm:text-base">
                                {user.name}
                            </h2>

                            <p className="mt-1 truncate text-xs text-gray-500 sm:text-sm">
                                {user.email}
                            </p>
                        </div>
                    </div>

                    <button
    type="button"
    onClick={handleSignOut}
    disabled={isSigningOut}
    className="flex shrink-0 items-center gap-1 rounded-lg border border-red-300 px-3 py-2 text-[11px] font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-60 sm:text-xs"
>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        className="h-3.5 w-3.5"
        aria-hidden="true"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 14l-4-4 4-4"
        />
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 10h10a4 4 0 0 1 0 8h-2"
        />
    </svg>

    {isSigningOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
</button>
                </section>

                {/* Update Profile Form */}
                <section className="mt-5 rounded-2xl border border-[#e8e6e1] bg-[#fffdfb] p-4 sm:p-5">
                    <h2 className="mb-6 text-sm font-bold">তথ্য</h2>

                    <form onSubmit={handleUpdate} className="space-y-3">
                        <div>
                            <label
                                htmlFor="name"
                                className="mb-2 block pl-1 text-xs font-medium"
                            >
                                নাম
                            </label>

                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="আপনার নাম লিখুন"
                                autoComplete="name"
                                required
                                className="h-9 w-full rounded-lg border border-[#e7e5e0] bg-transparent px-3 text-xs outline-none transition focus:border-[#43884a] focus:ring-1 focus:ring-[#43884a]"
                            />
                        </div>

                        {/* Success Message */}
                        {message && (
                            <p
                                role="status"
                                className="rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-xs text-green-700"
                            >
                                {message}
                            </p>
                        )}

                        {/* Error Message */}
                        {errorMessage && (
                            <p
                                role="alert"
                                className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600"
                            >
                                {errorMessage}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={isUpdating || !name.trim()}
                            className="h-9 w-full rounded-lg bg-[#43884a] text-xs font-semibold text-white shadow-[0_3px_0_#c7d8c8] transition hover:bg-[#36763d] active:translate-y-0.5 active:shadow-none disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isUpdating ? "আপডেট হচ্ছে..." : "আপডেট"}
                        </button>
                    </form>
                </section>

                {/* Back to Home */}
                <div className="mt-5 text-center">
                    <Link
                        href="/"
                        className="text-xs text-gray-500 transition hover:text-[#43884a]"
                    >
                        ← হোম পেজে ফিরে যান
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default ProfilePage;