"use client";

import Stripe from "stripe";
import { Card, CardContent, CardTitle } from "./ui/card";
import { useState } from "react";
import { useEffect } from "react";
import Image from "next/image";

interface Props {
  products: Stripe.Product[];
}

export function Carousel({ products }: Props) {
  // carousel component will display the products randomly after specific interval of time. To do  so
  const [current, setCurrent] = useState<number>(0);
  // useeffect to display the products randomly
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % products.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [products.length]);

  // to display the price of products
  const currentProduct = products[current];
  // console.log("current product: ",currentProduct)
  const price = currentProduct.default_price as Stripe.Price;

  // console.log("currentProduct details: ",price)

  return(
  <div>
    <Card  className="relative overflow-hidden rounded-lg shadow-md border-gray-300">
      {currentProduct.images && currentProduct.images[0] && (
        <div className="relative h-80 w-full">
          <Image
            src={currentProduct.images[0]}
            alt={currentProduct.name}
            layout="fill"
            objectFit="cover"
            className="transition-opacity duration-500 ease-in-out"
          />
        </div>
      )}

      {/* displaying product details using the shadcn card componetn from ui/card.tsx */}
      <CardContent className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
        <CardTitle className="text-3xl font-bold text-white mb-2">
          {currentProduct.name}
        </CardTitle>
        {/* fixing the price of product to 2 decimal places . Dividing by 100 because the actual price 15.99 as 1599 */}
        {price && price.unit_amount && (
          <p className="text-xl text-white">
            ${(price.unit_amount / 100).toFixed(2)}
          </p>
        )}
      </CardContent>
    </Card>
  </div>
  )
}
