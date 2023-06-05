const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import type { NextApiRequest, NextApiResponse } from "next";
import { ICartItem } from "@/context/StateContext";
import Error from "next/error";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "POST") {
    try {
      const line_items = req.body.cartItems.map((item: ICartItem) => {
        return {
          price_data: {
            currency: "eur",
            unit_amount: item.priceTTC,
            product_data: {
              name: item.title,
              images: item.imgURL,
            },
          },
          adjustable_quantity: { enabled: true, minimum: 1 },
          quantity: item.cartQty,
        };
      });

      // Create Checkout Sessions from body params.
      const params = {
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_address_collection: { allowed_countries: ["FR"] },
        shipping_options: [
          { shipping_rate: process.env.STRIPE_FREE_SHIPPING },
          { shipping_rate: process.env.STRIPE_FAST_SHIPPING },
        ],
        line_items,
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      };

      const session = await stripe.checkout.sessions.create(params);

      res.status(200).json(session);
    } catch (error: any) {
      res
        .status(error.statusCode || 500)
        .json({ statusCode: 500, message: error });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
