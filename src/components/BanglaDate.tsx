"use client";

import { useEffect, useState } from "react";

export default function BanglaDate() {
    const [date, setDate] = useState("");

    useEffect(() => {
        const currentDate = new Date().toLocaleDateString("bn-BD", {
            timeZone: "Asia/Dhaka",
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        });

        setDate(currentDate);
    }, []);

    return (
        <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            {date || "\u00A0"}
        </p>
    );
}