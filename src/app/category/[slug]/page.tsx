import { Suspense } from "react";
import { notFound } from "next/navigation";

interface Params {
  slug: string;
}

interface CategoryPageProps {
  params: Promise<Params>;
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

const API_URL =
  "https://api.api-store.workers.dev/api/bazardor/products";

async function CategoryProducts({
  params,
}: CategoryPageProps) {
  const { slug } = await params;

  const res = await fetch(
    `${API_URL}?category=${encodeURIComponent(slug)}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const products: Product[] = await res.json();

  if (!Array.isArray(products) || products.length === 0) {
    notFound();
  }

  const category = products[0];

  return (
    <main className="min-h-[calc(100vh-125px)] bg-[#f4f3ef] px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-[920px]">
        {/* Category heading */}
        <section className="mb-5 flex min-h-[77px] items-center gap-3 rounded-[15px] border border-[#e7e5e1] bg-[#fdfcfb] px-4 py-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f3f2ef] text-[28px]">
            {category.categoryIcon}
          </div>

          <div>
            <h1 className="text-[21px] font-bold leading-tight text-[#252923]">
              {category.categoryNameBn}
            </h1>

            <p className="mt-1 text-[12px] text-[#777873]">
              {category.categoryNameBn} পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </section>

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
            defaultValue="default"
            className="rounded-lg border border-[#d9d8d4] bg-transparent px-3 py-1.5 text-[12px] text-[#333630] outline-none focus:border-green-600"
            disabled
          >
            <option value="default">ডিফল্ট</option>
          </select>
        </section>

        {/* Product count */}
        <p className="mb-4 text-[12px] text-[#777873]">
          মোট {products.length}টি পণ্য দেখানো হচ্ছে
        </p>

        {/* Product grid */}
        <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.id}
              className="min-h-[113px] rounded-[15px] border border-[#e7e5e1] bg-[#fdfcfb] p-3 transition-shadow duration-200 hover:shadow-sm"
            >
              {/* Product information */}
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f3f2ef] text-[24px]">
                  {product.image || category.categoryIcon}
                </div>

                <div className="min-w-0">
                  <h2 className="text-[14px] font-bold leading-5 text-[#292c26]">
                    {product.nameBn}
                  </h2>

                  <p className="text-[11px] text-[#777873]">
                    {product.unit}
                  </p>
                </div>
              </div>

              {/* Price information */}
              <div className="mt-2.5">
                <p className="text-[11px] leading-4 text-[#777873]">
                  আজকের দাম
                </p>

                <div className="flex items-center justify-between gap-2">
                  <p className="text-[16px] font-bold leading-5 text-[#292c26]">
                    ৳{product.today} টাকা
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
                    {Math.abs(product.change.pct).toLocaleString(
                      "en-US",
                      {
                        minimumFractionDigits: 1,
                        maximumFractionDigits: 1,
                      }
                    )}
                    %
                  </span>
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

function CategoryLoading() {
  return (
    <main className="min-h-[calc(100vh-125px)] bg-[#f4f3ef] px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-[920px] animate-pulse">
        <div className="mb-5 h-[77px] rounded-[15px] bg-white" />

        <div className="mb-4 h-[55px] rounded-[15px] bg-white" />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-[113px] rounded-[15px] bg-white"
            />
          ))}
        </div>
      </div>
    </main>
  );
}

export default function CategoryPage({
  params,
}: CategoryPageProps) {
  return (
    <Suspense fallback={<CategoryLoading />}>
      <CategoryProducts params={params} />
    </Suspense>
  );
}