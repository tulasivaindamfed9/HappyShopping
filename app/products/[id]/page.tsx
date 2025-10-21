import { ProductDetail } from "@/components/product-detail";
import { stripe } from "@/lib/stripe";

// this page receives params which will be taking another param id from url and we are defining the type of params (id->string)
export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await stripe.products.retrieve(id, {
    expand: ["default_price"],
  });

  // we cannot directly pass the json product to the productDetail component as next js throws error
  // so stringify the json item and then pass it to productDetail component
  const plainProduct = JSON.parse(JSON.stringify(product));
  return <ProductDetail product={plainProduct} />;
}