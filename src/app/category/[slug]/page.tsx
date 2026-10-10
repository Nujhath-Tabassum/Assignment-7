import { Suspense } from "react";

import CategoryProductsGrid from "@/components/CategoryProductsGrid";
import CategoryProductsSkeleton from "@/components/CategoryProductsSkeleton";
import CategoryEmptyState from "@/components/CategoryEmptyState";

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

async function CategoryProducts({ params }: CategoryPageProps) {
  const { slug } = await params;

  const res = await fetch(
    `${API_URL}?category=${encodeURIComponent(slug)}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
  return <CategoryEmptyState />;
}

  const products: Product[] = await res.json();

  if (!Array.isArray(products) || products.length === 0) {
  return <CategoryEmptyState />;
}

  const category = products[0];

  return (
    <main className="min-h-[calc(100vh-125px)] bg-[#f4f3ef] px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-220">
        {/* Category heading */}
        <section className="mb-5 flex min-h-19.25 items-center gap-3 rounded-[15px] border border-[#e7e5e1] bg-[#fdfcfb] px-4 py-4">
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

        {/* Product grid */}
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
      <div className="mx-auto max-w-220">
        {/* Category heading skeleton */}
        <section className="mb-5 flex min-h-19.25 animate-pulse items-center gap-3 rounded-[15px] border border-[#e7e5e1] bg-[#fdfcfb] px-4 py-4">
          <div className="h-10 w-10 shrink-0 rounded-xl bg-gray-200" />

          <div className="flex-1 space-y-2">
            <div className="h-5 w-32 rounded bg-gray-200" />
            <div className="h-3 w-52 max-w-full rounded bg-gray-200" />
          </div>
        </section>

        <CategoryProductsSkeleton />
      </div>
    </main>
  );
}

export default function CategoryPage({ params }: CategoryPageProps) {
  return (
    <Suspense fallback={<CategoryLoading />}>
      <CategoryProducts params={params} />
    </Suspense>
  );
}