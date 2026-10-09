import Marquee from "@/components/Marquee";
import Image from "next/image";
import logo from "../../public/bazar-hero.png";
import AllProducts from "@/components/AllProducts";
import IncreasePrice from "@/components/IncreasePrice";
import DecreasingPrice from "@/components/DecreasingPrice";


export default function Home() {
    return (
        <div className="bg-green-50">
            <Marquee />

           <section className="px-6 py-5">
                <div className="mx-auto max-w-255 min-h-64 rounded-[20px] border border-gray-200 bg-white px-6 py-5 flex  justify-between overflow-hidden">

                    {/* Left Content */}
                    <div className="max-w-140">

                        {/* Date */}
                        <div className="inline-block rounded-full bg-green-50 px-3 py-1 text-[12px] text-green-700 mb-2">
                            মঙ্গলবার, ৬ অক্টোবর, ২০২৬
                        </div>

                        {/* Heading */}
                        <h1 className="text-[30px] font-bold leading-tight text-gray-800">
                            আজকের বাজারের দাম এক নজরে
                        </h1>

                        {/* Description */}
                        <p className="mt-4 max-w-[540px] text-[14px] leading-6 text-gray-500">
                            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
                            বাজারভিত্তিক বিস্তৃত, গড়, সর্বনিম্ন-সর্বাধিক এবং
                            দামের পরিবর্তন এক জায়গায়।
                        </p>

                        {/* Button */}
                        <button className="mt-5 rounded-md bg-green-600 px-5 py-2 text-sm font-medium text-white shadow-md transition hover:bg-green-700">
                            সব পণ্য দেখুন
                        </button>

                    </div>

                    {/* Right Image */}
                    <div className="hidden md:flex w-[230px] h-[190px] items-center justify-center shrink-0">
                        <Image
                            src={logo}
                            alt="বাজারের পণ্য"
                            width={230}
                            height={190}
                            className="object-contain"
                        />
                    </div>

                </div>
            </section>
            <IncreasePrice/>
            <DecreasingPrice/>
            <AllProducts/>
               
        </div>
    );
}