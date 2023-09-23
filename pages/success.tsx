import Success from "@/components/Success";
import { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { SessionDetails } from "@/types/types";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const success = ({
  sessionDetails,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <Success {...sessionDetails} />;
};

export const getServerSideProps: GetServerSideProps<{
  sessionDetails: SessionDetails;
}> = async (context) => {
  // const session = await await stripe.checkout.sessions.retrieve(req.query.session_id);
  const stripeSessionID = context.query.session_id;

  const res = await fetch(`${process.env.BASE_DOMAIN_URL}/api/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ session_id: stripeSessionID }),
  });

  const sessionDetails = await res.json();

  console.log("*** api_checkout response ***");
  console.log({ sessionDetails });

  return {
    props: { sessionDetails },
  };
};

export default success;
