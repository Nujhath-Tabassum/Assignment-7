"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const SignInPage = () => {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [socialLoading, setSocialLoading] = useState<
        "google" | "github" | null
    >(null);
    const [errorMessage, setErrorMessage] = useState("");

    // Email and password sign in
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsLoading(true);
        setErrorMessage("");

        const formData = new FormData(e.currentTarget);

        const email = String(formData.get("email") ?? "");
        const password = String(formData.get("password") ?? "");

        try {
            const { data, error } = await authClient.signIn.email({
                email,
                password,
                callbackURL: "/",
            });

            if (error) {
                console.error("Email sign-in error:", error);

                const message =
                    error.message || "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।";

                setErrorMessage(message);
                toast.error(message);
                return;
            }

            if (data) {
                toast.success("সফলভাবে সাইন ইন হয়েছে!");
                router.push("/");
                router.refresh();
            }
        } catch (error) {
            console.error("Email sign-in exception:", error);

            const message = "সাইন ইন করা যায়নি। আবার চেষ্টা করুন।";

            setErrorMessage(message);
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    // Google and GitHub sign in
    const handleSocialSignIn = async (
        provider: "google" | "github"
    ) => {
        if (socialLoading || isLoading) return;

        setErrorMessage("");
        setSocialLoading(provider);

        try {
            const { data, error } = await authClient.signIn.social({
                provider,
                callbackURL: "/",
            });

            if (error) {
                console.error(`${provider} sign-in error:`, error);

                const message =
                    error.message ||
                    (provider === "google"
                        ? "Google দিয়ে সাইন ইন করা যায়নি।"
                        : "GitHub দিয়ে সাইন ইন করা যায়নি।");

                setErrorMessage(message);
                toast.error(message);
                return;
            }

            // Better Auth normally redirects the browser to the provider.
            // If it returns without redirecting, log the response for debugging.
            console.log(`${provider} sign-in response:`, data);
        } catch (error) {
            console.error(`${provider} sign-in exception:`, error);

            const message =
                provider === "google"
                    ? "Google দিয়ে সাইন ইন করা যায়নি।"
                    : "GitHub দিয়ে সাইন ইন করা যায়নি।";

            setErrorMessage(message);
            toast.error(message);
        } finally {
            setSocialLoading(null);
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center bg-[#f5f4f0] px-4 pt-6 pb-8 text-[#333333]">
            {/* Heading */}
            <div className="mb-5 text-center">
                <h1 className="text-2xl font-bold">সাইন ইন</h1>

                <p className="mt-1 text-xs text-gray-500">
                    বাজারদর বুঝুন ও প্রতিদিনের বাজারের আপডেট দেখুন।
                </p>
            </div>

            {/* Sign In Form */}
            <div className="w-full max-w-sm rounded-2xl border border-[#e8e6e1] bg-[#fffdfb] p-4.5 shadow-sm">
                <form onSubmit={onSubmit} className="flex flex-col gap-3">
                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="mb-1 block text-xs font-medium"
                        >
                            ইমেইল
                        </label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            autoComplete="email"
                            required
                            disabled={isLoading || socialLoading !== null}
                            className="h-8 w-full rounded-lg border border-[#e7e5e0] bg-transparent px-3 text-xs outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600 disabled:opacity-60"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label
                            htmlFor="password"
                            className="mb-1 block text-xs font-medium"
                        >
                            পাসওয়ার্ড
                        </label>

                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="আপনার পাসওয়ার্ড লিখুন"
                            autoComplete="current-password"
                            required
                            disabled={isLoading || socialLoading !== null}
                            className="h-8 w-full rounded-lg border border-[#e7e5e0] bg-transparent px-3 text-xs outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600 disabled:opacity-60"
                        />
                    </div>

                    {/* Error Message */}
                    {errorMessage && (
                        <p
                            role="alert"
                            className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600"
                        >
                            {errorMessage}
                        </p>
                    )}

                    {/* Email Sign In Button */}
                    <button
                        type="submit"
                        disabled={isLoading || socialLoading !== null}
                        className="mt-0.5 h-8.25 w-full rounded-lg bg-[#43884a] text-xs font-semibold text-white shadow-[0_3px_0_#c7d8c8] transition hover:bg-[#36763d] active:translate-y-0.5 active:shadow-none disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isLoading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
                    </button>

                    {/* Divider */}
                    <div className="my-1 flex items-center gap-3">
                        <div className="h-px flex-1 bg-[#e5e3de]" />

                        <span className="text-xs text-gray-500">অথবা</span>

                        <div className="h-px flex-1 bg-[#e5e3de]" />
                    </div>

                    {/* Social Sign In */}
                    <div className="grid grid-cols-2 gap-2">
                        {/* Google */}
                        <button
                            type="button"
                            onClick={() => handleSocialSignIn("google")}
                            disabled={isLoading || socialLoading !== null}
                            className="flex min-h-9 items-center justify-center gap-1 rounded-lg border border-[#e7e5e0] bg-transparent px-2 text-[11px] font-medium transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            <span className="font-bold text-[#4285f4]">
                                G
                            </span>

                            {socialLoading === "google"
                                ? "সংযোগ হচ্ছে..."
                                : "Google দিয়ে চালিয়ে যান"}
                        </button>

                        {/* GitHub */}
                        <button
                            type="button"
                            onClick={() => handleSocialSignIn("github")}
                            disabled={isLoading || socialLoading !== null}
                            className="flex min-h-9 items-center justify-center gap-1 rounded-lg border border-[#e7e5e0] bg-transparent px-2 text-[11px] font-medium transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                className="h-3.5 w-3.5 shrink-0"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.54v-2.08c-3.1.67-3.75-1.32-3.75-1.32-.5-1.29-1.24-1.63-1.24-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.6 1.21 3.23.92.1-.72.39-1.21.7-1.49-2.47-.28-5.07-1.24-5.07-5.5 0-1.21.43-2.2 1.15-2.97-.12-.28-.5-1.41.11-2.94 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.12-1.44 3.05-1.14 3.05-1.14.61 1.53.23 2.66.11 2.94.72.77 1.15 1.76 1.15 2.97 0 4.27-2.6 5.21-5.08 5.49.4.35.75 1.02.75 2.06v3.08c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
                            </svg>

                            {socialLoading === "github"
                                ? "সংযোগ হচ্ছে..."
                                : "GitHub দিয়ে চালিয়ে যান"}
                        </button>
                    </div>
                </form>

                {/* Sign Up Link */}
                <p className="mt-3 text-center text-xs">
                    অ্যাকাউন্ট নেই?{" "}
                    <Link
                        href="/sign-up"
                        className="font-medium text-[#43884a] hover:underline"
                    >
                        সাইন আপ করুন
                    </Link>
                </p>
            </div>

            {/* Back to Home */}
            <Link
                href="/"
                className="mt-5 text-xs text-gray-500 transition hover:text-[#43884a]"
            >
                ← হোম পেজে ফিরে যান
            </Link>
        </main>
    );
};

export default SignInPage;