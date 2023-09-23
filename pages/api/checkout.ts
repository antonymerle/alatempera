const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  console.log("reached checkout endpoint");
  console.log(req.method);
  console.log(req.body.session_id);

  if (!req.body.session_id) {
    console.log("Bad request : session ID is missing");

    return res
      .status(400)
      .json({ sessionStatus: null, customerFirstName: null });
  }

  if (req.method === "POST") {
    console.log("method is post, proceeding");

    try {
      const session = await stripe.checkout.sessions.retrieve(
        req.body.session_id
      );

      const customerFirstName = session.customer_details.name.split(" ")[0];
      const sessionStatus: string = session.status;

      console.log({ session });
      console.log({ customerFirstName });
      console.log({ session });

      res.setHeader("content-length", "100");
      // Enable CORS for specific origins
      res.setHeader(
        "Access-Control-Allow-Origin",
        "https://www.alatempera.com"
      );
      res.status(200).json({ customerFirstName, sessionStatus });
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
