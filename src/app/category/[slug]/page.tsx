import { Suspense } from "react";
import { notFound } from "next/navigation";
import CategoryProductsGrid from "@/components/CategoryProductsGrid";

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

        {/* Working sorting bar and product grid */}
        <CategoryProductsGrid
          products={products}
          categoryIcon={category.categoryIcon}
        />
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