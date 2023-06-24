const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import type { NextApiRequest, NextApiResponse } from "next";
import { ICartItem } from "@/context/StateContext";
import { shipping_options } from "@/utils/getStripe";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  console.log("reached stripe endpoint");
  console.log(req.method);

  if (req.method === "POST") {
    console.log("method is post, proceeding");
    // console.log(item.imgURL);

    // console.log(
    //   process.env.DOMAIN_NAME + "images" + req.body.cartItems[0].imgURL[0]
    // );

    // cf documentation : line_items : https://stripe.com/docs/api/checkout/sessions/object#checkout_session_object-line_items
    try {
      const line_items = req.body.cartItems.map((item: ICartItem) => {
        return {
          // price_data : https://stripe.com/docs/api/subscriptions/update#update_subscription-items-price_data
          // description: item.type,
          price_data: {
            currency: "eur",
            unit_amount: Math.floor(item.priceTTC * 100),
            product_data: {
              name: item.title,
              description: item.type,
              images: [
                process.env.DOMAIN_NAME +
                  "_next/" +
                  "image?url=%2F" +
                  item.imgURL[0] +
                  "&w=1920&q=75",
              ],
              metadata: {
                id: item._id,
                type: item.type,
                title: item.title,
                quantity: item.cartQty,
              },
            },
          },
          adjustable_quantity: { enabled: true, minimum: 1 },
          quantity: item.cartQty,
          // price: {

          // },
          //taxes : https://stripe.com/docs/api/checkout/sessions/object#checkout_session_object-line_items-data-taxes
        };
      });

      console.log(line_items[0].price_data.product_data.images[0]);

      const commandDetails = line_items.map(
        (item: any) => item.price_data.product_data.metadata
      );

      console.log({ commandDetails });

      // Create Checkout Sessions from body params.
      const params = {
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_address_collection: { allowed_countries: ["FR"] },
        shipping_options,
        line_items,
        metadata: { commandDetails: JSON.stringify(commandDetails) },
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`, // CHECKOUT_SESSION_ID to get customer details https://stripe.com/docs/payments/checkout/custom-success-page
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
