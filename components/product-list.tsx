"use client"

import Stripe from "stripe";
import { ProductCard } from "./product-card";
import { useState } from "react";

interface Props {
    products: Stripe.Product[];
  }

export function ProductList({products}:Props){
//   search box logic
const [searchTerm, setSearchTerm] = useState<string>("");
const filteredProduct= products.filter((product) => {
    // converting search term to lowercase
    const term = searchTerm.toLowerCase();
    // converting our product name to lower case
    const nameMatch = product.name.toLowerCase().includes(term);
    // converting our product description to lowercase
    const descriptionMatch = product.description
      ? product.description.toLowerCase().includes(term)
      : false;

    return nameMatch || descriptionMatch;
  });


    return(
        <>
        <div>
            <div className="mb-6 flex justify-center">
                <input type="text"
                 placeholder="search products..."
                 value={searchTerm}
                 onChange={(e)=>setSearchTerm(e.target.value)}
                 className="w-full max-w-md rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>
            
            {/* displaying all the products in the page by passing each product to the ProductCard component */}
            <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProduct.map((product,key)=>{
                    return(
                        <li key={key}>
                    <ProductCard product={product}/>
                    </li>
                    )
                })}
            </ul>
        </div>
        </>
    )
}