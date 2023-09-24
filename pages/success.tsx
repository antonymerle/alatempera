// import { NextApiRequest, NextApiResponse } from "next";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   console.log("*** api_checkout ***");
//   console.log(req.body);

//   const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//   const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
//   const customer = await stripe.customers.retrieve(session.customer);

//   // res.send(
//   //   `<html><body><h1>Thanks for your order, ${customer.name}!</h1></body></html>`
//   // );

//   return

//   console.log("*** api_checkout session ***");
//   console.log(session);

//   res.status(200).json(session);
// }
import Success from "@/components/Success";
import { InferGetServerSidePropsType, GetServerSideProps } from "next";

const success = ({ session }: any) => {
  return <Success {...session} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  try {
    const session = await stripe.checkout.sessions.retrieve(
      context.query.session_id
    );

    console.log({ session });

    // const customer = await stripe.customers.retrieve(session.customer);
    // const session = await await stripe.checkout.sessions.retrieve(req.query.session_id);
    // const stripeSessionID = context.query.session_id;

    // const payloadLength = Buffer.byteLength(
    //   JSON.stringify({ session_id: stripeSessionID }),
    //   "utf8"
    // ).toString();

    // console.log("*** api_checkout payloadLength ***");
    // console.log({ payloadLength });

    // console.log(JSON.stringify({ session_id: stripeSessionID }));

    // try {
    //   const res = await fetch(`${process.env.BASE_DOMAIN_URL}/api/checkout`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       // "Access-Control-Allow-Origin": "*",
    //       // "Content-length": "0",
    //     },
    //     body: JSON.stringify({ session_id: stripeSessionID }),
    //   });

    //   const sessionDetails = await res.json();

    //   console.log("*** api_checkout response ***");
    //   console.log({ sessionDetails });
    return {
      props: { session },
    };
  } catch (error) {
    console.log(error);
    return {
      props: { session: null },
    };
  }
};

export default success;
