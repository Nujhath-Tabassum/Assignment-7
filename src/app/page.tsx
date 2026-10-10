import Image from "next/image";
import logo from "../../public/bazar-hero.png";
import AllProducts from "@/components/AllProducts";
import IncreasePrice from "@/components/IncreasePrice";
import DecreasingPrice from "@/components/DecreasingPrice";

import Link from "next/link";

export default function Home() {
    return (
        <div className="bg-[#f4f3ef]">

            <section className="px-3 py-4 sm:px-6 sm:py-5">
                <div className="mx-auto flex min-h-64 max-w-255 flex-col justify-between overflow-hidden rounded-[20px] border border-gray-200 bg-white px-4 py-5 sm:px-6 sm:py-5 md:flex-row">

                    {/* Left Content */}
                    <div className="max-w-140">

                        {/* Date */}
                        <div className="mb-2 inline-block rounded-full bg-green-50 px-3 py-1 text-[12px] text-green-700">
                            মঙ্গলবার, ৬ অক্টোবর, ২০২৬
                        </div>

                        {/* Heading */}
                        <h1 className="text-[24px] font-bold leading-tight text-gray-800 sm:text-[30px]">
                            আজকের বাজারের দাম এক নজরে
                        </h1>

                        {/* Description */}
                        <p className="mt-3 max-w-135 text-[13px] leading-6 text-gray-500 sm:mt-4 sm:text-[14px]">
                            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
                            বাজারভিত্তিক বিস্তৃত, গড়, সর্বনিম্ন-সর্বাধিক এবং
                            দামের পরিবর্তন এক জায়গায়।
                        </p>

                        {/* Primary CTA Button */}
<Link
    href="#সব-পণ্য"
    className="mt-4 inline-flex items-center justify-center rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-green-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 sm:mt-5"
>
    সব পণ্য দেখুন
</Link>
                    </div>

                    {/* Right Image */}
                    <div className="mt-5 flex h-40 w-full shrink-0 items-center justify-center sm:h-47.5 md:mt-0 md:h-47.5 md:w-57.5">
                        <Image
                            src={logo}
                            alt="বাজারের পণ্য"
                            width={230}
                            height={190}
                            className="h-full max-h-47.5 w-auto max-w-full object-contain"
                        />
                    </div>

                </div>
            </section>

            <IncreasePrice />
            <DecreasingPrice />
            <div id="সব-পণ্য" className="scroll-mt-6">
    <AllProducts />
</div>

        </div>
    );
}