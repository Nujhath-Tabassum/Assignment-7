import Link from "next/link";

interface Product {
  id: number;
  nameBn: string;
  image: string;
  today: number;
  unit: string;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

const banglaNumber = (number: number) => {
  const digits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

  return number.toString().replace(/\d/g, (digit) => {
    return digits[Number(digit)];
  });
};

const DecreasingPrice = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
    {
      cache: "force-cache",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch decreasing-price products");
  }

  const products: Product[] = await res.json();

  const decreasedProducts = products
    .filter((product) => product.change.dir === "down")
    .sort(
      (a, b) =>
        Math.abs(b.change.pct) - Math.abs(a.change.pct)
    )
    .slice(0, 6);

  return (
    <section className="px-6 pb-5">
      <div className="mx-auto max-w-255">
        <h2 className="flex items-center gap-1 text-[19px] font-bold text-gray-800">
          <span className="text-[10px] text-green-600">▼</span>
          আজকে দাম কমেছে
        </h2>

        <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {decreasedProducts.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              aria-label={`${product.nameBn} পণ্যের বিস্তারিত দেখুন`}
              className="block rounded-xl border border-gray-200 bg-white p-3 transition duration-200 hover:-translate-y-0.5 hover:border-green-200 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#f5f6f2] text-[22px]">
                  {product.image}
                </div>

                <div>
                  <h3 className="text-[14px] font-semibold text-gray-800">
                    {product.nameBn}
                  </h3>

                  <p className="text-[10px] text-gray-500">
                    প্রতি {product.unit}
                  </p>
                </div>
              </div>

              <div className="mt-3 flex items-end justify-between">
                <div>
                  <p className="text-[10px] text-gray-500">
                    আজকের দাম
                  </p>

                  <p className="text-[17px] font-bold text-gray-800">
                    {banglaNumber(product.today)}{" "}
                    <span className="text-[11px] font-normal">
                      টাকা
                    </span>
                  </p>
                </div>

                <span className="rounded-full bg-green-50 px-2 py-1 text-[10px] text-green-600">
                  ▼ {banglaNumber(Math.abs(product.change.pct))}%
                </span>
              </div>
            </Link>
          ))}
        </div>

        {decreasedProducts.length === 0 && (
          <p className="mt-4 rounded-xl border border-gray-200 bg-white p-5 text-center text-sm text-gray-500">
            আজকে দাম কমেছে এমন কোনো পণ্য পাওয়া যায়নি।
          </p>
        )}
      </div>
    </section>
  );
};

export default DecreasingPrice;