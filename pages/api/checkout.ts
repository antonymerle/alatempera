const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  console.log("reached checkout endpoint");
  console.log(req.method);
  console.log(req.body.session_id);

  if (req.method === "POST") {
    console.log("method is post, proceeding");

    try {
      const session = await stripe.checkout.sessions.retrieve(
        req.body.session_id
      );

      const customerFirstName = session.customer_details.name.split(" ")[0];

      console.log({ session });
      console.log({ customerFirstName });

      // const customer = await stripe.customers.retrieve(session.customer);
      console.log({ session });
      // console.log({ customer });

      res.status(200).json({ customerFirstName });
    } catch (error: any) {
      console.error(error);
      res
        .status(error.statusCode || 500)
        .json({ statusCode: 500, message: error });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
