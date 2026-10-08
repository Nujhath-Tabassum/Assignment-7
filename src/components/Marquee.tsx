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

    const products: Product[] = await res.json();

    return (
        <div className="w-full bg-white text-gray-700 flex overflow-hidden border-y border-gray-200">

            {/* Moving products */}
            <div className="flex-1 min-w-0 overflow-hidden">

                <MarqueeText
                    className="py-2"
                    duration={10}
                    direction="left"
                >
                    {products.map((product) => (
                        <span
                            key={product.id}
                            className="whitespace-nowrap text-[12px]"
                        >
                            {/* Product image */}
                            <span className="mr-1">
                                {product.image}
                            </span>

                            {/* Product name */}
                            <span>
                                {product.nameBn}
                            </span>

                            {/* Price */}
                            <span className="mx-1">
                                {product.today} টাকা/{product.unit}
                            </span>

                            {/* Change */}
                            {product.change.dir === "up" && (
                                <span className="text-red-500">
                                    ▲ {product.change.pct}%
                                </span>
                            )}

                            {product.change.dir === "down" && (
                                <span className="text-green-600">
                                    ▼ {Math.abs(product.change.pct)}%
                                </span>
                            )}

                            {product.change.dir === "flat" && (
                                <span className="text-gray-500">
                                    — 0%
                                </span>
                            )}

                            {/* Separator */}
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