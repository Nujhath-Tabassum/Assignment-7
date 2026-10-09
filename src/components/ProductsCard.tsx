import Link from "next/link";
import React from "react";

type Product = {
id: string;
slug: string;
nameBn: string;
icon: string;
};

type ProductCardProps = {
product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
return (
<Link href={`/products/${product.id}`}> <div className="h-full"> <div className="card bg-base-100 shadow-sm h-full"> <div className="card-body items-center text-center"> <p className="text-5xl">
{product.icon} </p>

```
                    <h2 className="card-title">
                        {product.nameBn}
                    </h2>

                    <p>{product.slug}</p>
                </div>
            </div>
        </div>
    </Link>
);


};

export default ProductCard;

