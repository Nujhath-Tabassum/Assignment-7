import Link from "next/link";

export default function CategoryEmptyState() {
  return (
    <main className="flex min-h-[calc(100vh-125px)] items-center justify-center bg-[#f4f3ef] px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-[#e7e5e1] bg-[#fdfcfb] px-6 py-10 text-center">
        <div className="mb-5 text-6xl" aria-hidden="true">
          🔎
        </div>

        <h1 className="text-2xl font-bold text-[#252923]">
          ৪০৪ — পণ্য পাওয়া যায়নি
        </h1>

        <p className="mt-3 text-sm leading-6 text-[#777873]">
          এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি, অথবা ক্যাটাগরিটি
          বিদ্যমান নেই।
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-[#27834a] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#206b3d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#27834a]"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}