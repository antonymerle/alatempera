const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import type { NextApiRequest, NextApiResponse } from "next";
import { ICartItem } from "@/context/StateContext";
import {
  fallback_shipping,
  france_shipping,
  europe_shipping,
  uk_shipping,
  north_america_shipping,
  countryISOCodes,
} from "@/utils/getStripe";
import geoip from "geoip-lite";
const requestIp = require("request-ip");
import type { ISOCodes } from "@/types/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  console.log("reached stripe endpoint");
  console.log(req.method);

  if (req.method === "POST") {
    console.log("method is post, proceeding");
    console.log(req.headers["accept-language"]);
    const lang = req.headers["accept-language"];

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
              name: lang === "fr" ? item.title_fr : item.title_en,
              description: item.type,
              images: [
                process.env.DOMAIN_NAME +
                  "_next/" +
                  "image?url=%2F" +
                  item.pictures[0].src +
                  "&w=1920&q=75",
              ],
              metadata: {
                id: item._id,
                type: item.type,
                title: lang === "fr" ? item.title_fr : item.title_en,
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

      console.log("**** GEOLOCATION *****");
      // geolocation to make dynamic shipping fees.

      const ip = requestIp.getClientIp(req);
      // const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
      // const ipv4 = ip?.split(",").pop()?.trim(); // Extract the last IP address in the list
      console.log(ip);

      const geo = geoip.lookup(ip as string);

      let shipping_options = fallback_shipping; // default

      if (geo) {
        const country = geo.country;
        console.log("Country:", country);

        if (geo.country === "FR") {
          shipping_options = france_shipping;
        } else if (countryISOCodes.europeNoFR.includes(geo.country)) {
          shipping_options = europe_shipping;
        } else if (countryISOCodes.northAmerica.includes(geo.country)) {
          shipping_options = north_america_shipping;
        } else if (geo.country === "GB") {
          shipping_options = uk_shipping;
        }
      } else {
        console.log(
          "Country information not available, defaulting to fallback shipping"
        );
      }

      const allowed_countries = [
        "FR",
        "GB",
        ...countryISOCodes.europeNoFR,
        ...countryISOCodes.northAmerica,
      ];

      console.log(allowed_countries);

      // Create Checkout Sessions from body params.
      const params = {
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_address_collection: { allowed_countries },
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
