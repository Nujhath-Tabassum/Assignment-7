import { Suspense } from "react";
import { notFound } from "next/navigation";
import { connection } from "next/server";

interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
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
  markets: Market[];
}

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

const API_URL =
  "https://api.abcz.workers.dev/api/bazardor/products";

function toBanglaNumber(value: number): string {
  return value.toString().replace(/\d/g, (digit) => {
    return "০১২৩৪৫৬৭৮৯"[Number(digit)];
  });
}

function toBanglaUnit(unit: string): string {
  const units: Record<string, string> = {
    kg: "কেজি",
    kilogram: "কেজি",
    kilograms: "কেজি",
    gram: "গ্রাম",
    g: "গ্রাম",
    liter: "লিটার",
    litre: "লিটার",
    liters: "লিটার",
    litres: "লিটার",
    piece: "পিস",
    pieces: "পিস",
    dozen: "ডজন",
  };

  return units[unit.toLowerCase()] ?? unit;
}

function ProductLoading() {
  return (
    <main className="min-h-screen bg-[#f5f4f0] px-4 py-6">
      <div className="mx-auto max-w-205 animate-pulse space-y-4">
        <div className="h-28 rounded-xl bg-white" />
        <div className="h-36 rounded-xl bg-white" />
        <div className="h-96 rounded-xl bg-white" />
      </div>
    </main>
  );
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <Suspense fallback={<ProductLoading />}>
      <ProductDetails params={params} />
    </Suspense>
  );
}

async function ProductDetails({ params }: ProductPageProps) {
  // Render this part dynamically instead of during prerendering.
  await connection();

  const { id } = await params;

  // Only allow numeric product IDs.
  if (!/^\d+$/.test(id)) {
    notFound();
  }

  const res = await fetch(
    `${API_URL}/${encodeURIComponent(id)}`,
    { cache: "no-store" }
  );

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error("Failed to fetch product details");
  }

  const product: Product = await res.json();

  if (!product?.id) {
    notFound();
  }

  const priceChangeColor =
    product.change.dir === "up"
      ? "text-red-600"
      : product.change.dir === "down"
        ? "text-green-700"
        : "text-gray-500";

  const priceChangeIcon =
    product.change.dir === "up"
      ? "▲"
      : product.change.dir === "down"
        ? "▼"
        : "—";

  const priceChangeText =
    product.change.dir === "up"
      ? "দাম বেড়েছে"
      : product.change.dir === "down"
        ? "দাম কমেছে"
        : "দাম অপরিবর্তিত";

  const markets = product.markets ?? [];

  const lowestMarketPrice =
    markets.length > 0
      ? Math.min(...markets.map((market) => market.min))
      : null;

  const highestMarketPrice =
    markets.length > 0
      ? Math.max(...markets.map((market) => market.max))
      : null;

  return (
    <main className="min-h-screen bg-[#f5f4f0] px-4 py-5 sm:px-6 sm:py-7">
      <div className="mx-auto max-w-205 space-y-4">
        {/* Product header */}
        <section className="rounded-xl border border-[#e8e6e1] bg-[#fdfcfb] p-4 sm:p-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#f3f2ee] text-3xl sm:h-16 sm:w-16">
                {product.image || product.categoryIcon}
              </div>

              <div className="min-w-0">
                <h1 className="text-lg font-bold leading-snug text-[#292c26] sm:text-xl">
                  {product.nameBn}
                </h1>

                <p className="mt-0.5 text-xs text-[#777873]">
                  প্রতি {toBanglaUnit(product.unit)} ·{" "}
                  {product.categoryNameBn}
                </p>

                <p className="mt-2 text-xs text-[#55564f]">
                  গতকালের তুলনায় আজকের দাম{" "}
                  <span className="font-semibold">
                    {priceChangeText}
                  </span>{" "}
                  · {toBanglaNumber(product.today)} টাকা
                </p>
              </div>
            </div>

            {/* Today's price */}
            <div className="w-25 shrink-0 rounded-xl bg-[#f5f4f0] px-3 py-3 text-center sm:w-[112px]">
              <p className="text-[10px] text-[#777873]">
                আজকের দাম
              </p>

              <p className="mt-1 text-2xl font-bold leading-none text-[#292c26]">
                {toBanglaNumber(product.today)}
              </p>

              <p className="mt-1 text-[11px] text-[#777873]">
                টাকা / {toBanglaUnit(product.unit)}
              </p>

              <p
                className={`mt-1 text-[10px] font-semibold ${priceChangeColor}`}
              >
                {priceChangeIcon}{" "}
                {toBanglaNumber(Math.abs(product.change.pct))}%
              </p>
            </div>
          </div>
        </section>

        {/* Price summary */}
        <section className="rounded-xl border border-[#e8e6e1] bg-[#fdfcfb] p-4 sm:p-5">
          <h2 className="mb-3 text-sm font-bold text-[#292c26]">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {/* Lowest market price */}
            <div className="rounded-xl border border-[#eae8e3] p-3">
              <p className="text-[11px] text-[#777873]">
                সর্বনিম্ন দাম
              </p>

              <p className="mt-1 text-xl font-bold text-green-700">
                {lowestMarketPrice !== null
                  ? toBanglaNumber(lowestMarketPrice)
                  : "—"}{" "}
                <span className="text-xs font-normal">টাকা</span>
              </p>

              <p className="mt-1 text-[10px] text-[#777873]">
                {lowestMarketPrice !== null
                  ? "সবচেয়ে কম দামের বাজার"
                  : "তথ্য পাওয়া যায়নি"}
              </p>
            </div>

            {/* Highest market price */}
            <div className="rounded-xl border border-[#eae8e3] p-3">
              <p className="text-[11px] text-[#777873]">
                সর্বোচ্চ দাম
              </p>

              <p className="mt-1 text-xl font-bold text-red-600">
                {highestMarketPrice !== null
                  ? toBanglaNumber(highestMarketPrice)
                  : "—"}{" "}
                <span className="text-xs font-normal">টাকা</span>
              </p>

              <p className="mt-1 text-[10px] text-[#777873]">
                {highestMarketPrice !== null
                  ? "সবচেয়ে বেশি দামের বাজার"
                  : "তথ্য পাওয়া যায়নি"}
              </p>
            </div>

            {/* Average market price */}
            <div className="rounded-xl border border-[#eae8e3] p-3">
              <p className="text-[11px] text-[#777873]">
                গড় দাম
              </p>

              <p className="mt-1 text-xl font-bold text-green-700">
                {markets.length > 0
                  ? toBanglaNumber(
                      Math.round(
                        markets.reduce(
                          (sum, market) =>
                            sum + (market.min + market.max) / 2,
                          0
                        ) / markets.length
                      )
                    )
                  : "—"}{" "}
                <span className="text-xs font-normal">টাকা</span>
              </p>

              <p className="mt-1 text-[10px] text-[#777873]">
                প্রতি {toBanglaUnit(product.unit)}-এর গড় বাজারদর
              </p>
            </div>
          </div>

          {/* Market price table */}
          <div className="mt-5">
            <h2 className="mb-3 text-sm font-bold text-[#292c26]">
              বাজারভিত্তিক আজকের দাম
            </h2>

            {markets.length > 0 ? (
              <div className="overflow-x-auto rounded-xl border border-[#e8e6e1]">
                <table className="w-full min-w-[580px] border-collapse text-left text-xs">
                  <thead className="bg-[#fdfcfb] text-[#777873]">
                    <tr>
                      <th className="px-3 py-3 font-medium">
                        বাজার
                      </th>

                      <th className="px-3 py-3 font-medium">
                        বিভাগ
                      </th>

                      <th className="px-3 py-3 text-right font-medium">
                        সর্বনিম্ন
                      </th>

                      <th className="px-3 py-3 text-right font-medium">
                        সর্বোচ্চ
                      </th>

                      <th className="px-3 py-3 text-right font-medium">
                        গড়
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {markets.map((market, index) => {
                      const average = Math.round(
                        (market.min + market.max) / 2
                      );

                      return (
                        <tr
                          key={`${market.market}-${index}`}
                          className={`border-t border-[#deddd7] ${
                            index % 2 === 0
                              ? "bg-[#fdfcfb]"
                              : "bg-[#f3f2ee]"
                          }`}
                        >
                          <td className="px-3 py-3 font-medium text-[#292c26]">
                            {market.market}
                          </td>

                          <td className="px-3 py-3 text-[#55564f]">
                            {market.division}
                          </td>

                          <td className="whitespace-nowrap px-3 py-3 text-right text-[#292c26]">
                            {toBanglaNumber(market.min)} টাকা
                          </td>

                          <td className="whitespace-nowrap px-3 py-3 text-right text-[#292c26]">
                            {toBanglaNumber(market.max)} টাকা
                          </td>

                          <td className="whitespace-nowrap px-3 py-3 text-right font-semibold text-[#292c26]">
                            {toBanglaNumber(average)} টাকা
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="rounded-xl border border-[#e8e6e1] p-6 text-center text-sm text-[#777873]">
                এই পণ্যের বাজারভিত্তিক দামের তথ্য পাওয়া যায়নি।
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}