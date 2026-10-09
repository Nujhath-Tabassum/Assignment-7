"use client";
import Link from "next/link";

import { useMemo, useState } from "react";
function toBanglaNumber(value: number): string {
  const banglaDigits = "০১২৩৪৫৬৭৮৯";

  return value.toString().replace(/\d/g, (digit) => {
    return banglaDigits[Number(digit)];
  });
}
interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

interface CategoryProductsGridProps {
  products: Product[];
  categoryIcon: string;
}

type SortOption = "default" | "high-to-low" | "low-to-high";

export default function CategoryProductsGrid({
  products,
  categoryIcon,
}: CategoryProductsGridProps) {
  const [sort, setSort] = useState<SortOption>("default");

  const sortedProducts = useMemo(() => {
    const result = [...products];

    if (sort === "high-to-low") {
      result.sort((a, b) => b.today - a.today);
    } else if (sort === "low-to-high") {
      result.sort((a, b) => a.today - b.today);
    }

    return result;
  }, [products, sort]);

  return (
    <>
      {/* Sorting bar */}
      <section className="mb-4 flex h-[55px] items-center justify-end rounded-[15px] border border-[#e7e5e1] bg-[#fdfcfb] px-4">
        <label
          htmlFor="sort"
          className="mr-2 text-[12px] text-[#777873]"
        >
          সাজান
        </label>

        <select
          id="sort"
          value={sort}
          onChange={(event) =>
            setSort(event.target.value as SortOption)
          }
          className="cursor-pointer rounded-lg border border-[#d9d8d4] bg-[#fdfcfb] px-3 py-1.5 text-[12px] text-[#333630] outline-none focus:border-green-600"
        >
          <option value="default">ডিফল্ট</option>
          <option value="high-to-low">বেশি থেকে কম</option>
          <option value="low-to-high">কম থেকে বেশি</option>
        </select>
      </section>

      {/* Product count */}
      <p className="mb-4 text-[12px] text-[#777873]">
        মোট {sortedProducts.length}টি পণ্য দেখানো হচ্ছে
      </p>

      {/* Product grid */}
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map((product) => (
          <Link
  key={product.id}
  href={`/product/${product.id}`}
  className="block min-h-[113px] rounded-[15px] border border-[#e7e5e1] bg-[#fdfcfb] p-3 transition-shadow duration-200 hover:shadow-sm"
>
            {/* Product information */}
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f3f2ef] text-[24px]">
                {product.image || categoryIcon}
              </div>

              <div className="min-w-0">
                <h2 className="text-[14px] font-bold leading-5 text-[#292c26]">
                  {product.nameBn}
                </h2>

               
              </div>
            </div>

            {/* Price information */}
            <div className="mt-2.5">
              <p className="text-[11px] leading-4 text-[#777873]">
                আজকের দাম
              </p>

              <div className="flex items-center justify-between gap-2">
                <p className="text-[16px] font-bold leading-5 text-[#292c26]">
                  {toBanglaNumber(product.today)} <span className="text-[12px]">টাকা</span>
                </p>

                {/* Price change */}
               
<span
  className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-semibold leading-none ${
    product.change.dir === "up"
      ? "bg-[#f8f2f0] text-[#c7443e]"
      : product.change.dir === "down"
        ? "bg-[#eff5ee] text-[#47945b]"
        : "bg-[#f1f1ed] text-[#666961]"
  }`}
>
  {product.change.dir === "up"
    ? "▲"
    : product.change.dir === "down"
      ? "▼"
      : "—"}{" "}
  {toBanglaNumber(Math.abs(product.change.pct))}%
</span>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}