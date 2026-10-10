import React from "react";
import ProtectedProductLink from "./ProtectedProductLink";

type Product = {
    id: string | number;
    slug: string;
    nameBn: string;
    icon: string;
};

type ProductCardProps = {
    product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <ProtectedProductLink
            href={`/product/${product.id}`}
            className="block rounded-xl border border-gray-200 bg-white p-4 transition hover:border-green-500 hover:shadow-md"
        >
            <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-green-50 text-2xl">
                    {product.icon}
                </div>

                <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-gray-800">
                        {product.nameBn}
                    </h3>

                    <p className="mt-1 text-xs text-gray-500">
                        বিস্তারিত দেখুন →
                    </p>
                </div>
            </div>
        </ProtectedProductLink>
    );
};

export default ProductCard;