import { Suspense } from "react";
import CategoryProductsGrid from "@/components/CategoryProductsGrid";
import CategoryProductsSkeleton from "@/components/CategoryProductsSkeleton";

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
  "https://api.abcz.workers.dev/api/bazardor/products";

async function CategoryProducts({ params }: CategoryPageProps) {
  const { slug } = await params;

  const url = `${API_URL}?category=${encodeURIComponent(slug)}`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Failed to fetch category products:", {
      url: res.url,
      status: res.status,
      statusText: res.statusText,
    });

    throw new Error(
      `Failed to fetch products: ${res.status} ${res.statusText}`
    );
  }

  const contentType = res.headers.get("content-type") ?? "";

  if (!contentType.toLowerCase().includes("application/json")) {
    const responseText = await res.text();

    console.error("Category API returned a non-JSON response:", {
      url: res.url,
      status: res.status,
      contentType,
      responsePreview: responseText.slice(0, 300),
    });

    throw new Error(
      "The category API did not return JSON. Check the server logs."
    );
  }

  let data: unknown;

  try {
    data = await res.json();
  } catch (error) {
    console.error("Failed to parse category API response:", error);

    throw new Error("The category API returned invalid JSON.");
  }

  if (!Array.isArray(data)) {
    console.error("Unexpected category API response:", data);

    throw new Error(
      "The category API returned an unexpected data format."
    );
  }

  const products = data as Product[];

  if (products.length === 0) {
    return null;
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

export default function CategoryPage({
  params,
}: CategoryPageProps) {
  return (
    <Suspense fallback={<CategoryLoading />}>
      <CategoryProducts params={params} />
    </Suspense>
  );
}