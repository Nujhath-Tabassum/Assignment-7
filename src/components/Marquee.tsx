import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

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

const Marquee = async () => {
    const res = await fetch(
        "https://api.abcz.workers.dev/api/bazardor/products",
        {
            cache: "force-cache",
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch marquee products");
    }

    const products: Product[] = await res.json();

    const banglaNumber = (number: number) =>
        number.toString().replace(/\d/g, (digit) =>
            "০১২৩৪৫৬৭৮৯"[Number(digit)]
        );

    return (
        <div className="flex w-full overflow-hidden border-y border-gray-200 bg-white text-gray-700">
            <div className="min-w-0 flex-1 overflow-hidden">
                <MarqueeText
                    className="py-2"
                    duration={20}
                    direction="right"
                >
                    {products.map((product) => (
                        <span
                            key={product.id}
                            className="whitespace-nowrap text-[12px]"
                        >
                            <span className="mr-1">
                                {product.image}
                            </span>

                            <span>{product.nameBn}</span>

                            <span className="mx-1">
                                {banglaNumber(product.today)} টাকা/
                                {product.unit}
                            </span>

                            {product.change.dir === "up" && (
                                <span className="text-red-500">
                                    ▲ {banglaNumber(product.change.pct)}%
                                </span>
                            )}

                            {product.change.dir === "down" && (
                                <span className="text-green-600">
                                    ▼{" "}
                                    {banglaNumber(
                                        Math.abs(product.change.pct)
                                    )}
                                    %
                                </span>
                            )}

                            {product.change.dir === "flat" && (
                                <span className="text-gray-500">
                                    — ০%
                                </span>
                            )}

                            <span className="mx-5 text-gray-300">
                                |
                            </span>
                        </span>
                    ))}
                </MarqueeText>
            </div>
        </div>
    );
};

export default Marquee;