import Image from "next/image";
import { stripe } from "@/lib/stripe";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Carousel } from "@/components/carousel";

export default async function Home() {
  // we are importing stripe products list from stripe.ts file
  const products=await stripe.products.list({
    expand:["data.default_price"],
    limit:4,
}
   )
   console.log("stripe products list: ",products)
  return (
   <>
  <section className="rounded bg-neutral-100 py-8 sm:py-12">
    <div className="mx-auto grid grid-cols-1 items-center justify-items-center gap-8 px-8 sm:px-16 md:grid-cols-2">
    <div className="max-w-md space-y-4">
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Hey there!! Welcome to the website</h1>
      <p className="text-neutral-600">Shop your favourite products at best price..!</p>
      {/* shadcn button */}
      {/* since it is a server component, we use link to navigate to products page */}
       <Button
              asChild
              variant="default"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-black text-white"
            >
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-full px-6 py-3"
              >
                Browse All Products
              </Link>
            </Button>
            {/* to display an image i'm using first image from my strpie api images */}
            <Image
            alt="Hero Image"
            src={products.data[0].images[0]}
            className="rounded"
            width={450}
            height={450}
          />
    </div>
    </div>
     
  </section>
  <section><Carousel products={products.data}/></section>
  
   </>
  );
}
