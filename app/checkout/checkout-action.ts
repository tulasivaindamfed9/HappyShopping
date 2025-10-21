"use server";
// use server as it is stripe form

import { stripe } from "@/lib/stripe";
import { CartItem } from "@/store/cart-store";
import { redirect } from "next/navigation";

export const checkoutAction = async (formData: FormData): Promise<void> => {
    // getting items as string format
    const itemsJson = formData.get("items") as string;
    // converting again to json format
    const items = JSON.parse(itemsJson);

    // line_items is same like the typescript format of CartItem. 
    // But diff is we are passing them to stripe in whatever format the stripe want
    const line_items = items.map((item: CartItem) => ({
      price_data: {
        currency: "cad",
        product_data: { name: item.name },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    }));

    // we are creating a session to the stripe abou the payment mode, items list, mode of payment, success and failure url
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,  //if success, success page.tsx is displayed
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,  //if canceled, go back to check out page
      });
    
      redirect(session.url!);
}