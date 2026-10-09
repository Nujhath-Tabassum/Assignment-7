"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";

interface ProtectedProductLinkProps {
    href: string;
    children: ReactNode;
    className?: string;
}

export default function ProtectedProductLink({
    href,
    children,
    className = "",
}: ProtectedProductLinkProps) {
    const { data: session, isPending } = authClient.useSession();
    const router = useRouter();

    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();

        if (isPending) return;

        if (!session?.user) {
            router.push("/sign-in");
            return;
        }

        router.push(href);
    };

    return (
        <a href={href} onClick={handleClick} className={className}>
            {children}
        </a>
    );
}