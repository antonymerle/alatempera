import Success from "@/components/Success";
import { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { SessionDetails } from "@/types/types";

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

  const payloadLength = Buffer.byteLength(
    JSON.stringify({ session_id: stripeSessionID })
  ).toString();

  try {
    const res = await fetch(`${process.env.BASE_DOMAIN_URL}/api/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "Access-Control-Allow-Origin": "*",
        "Content-length": payloadLength,
      },
      body: JSON.stringify({ session_id: stripeSessionID }),
    });

    const sessionDetails = await res.json();

    console.log("*** api_checkout response ***");
    console.log({ sessionDetails });

    return {
      props: { sessionDetails },
    };
  } catch (error) {
    console.log(error);
    return {
      props: { sessionDetails: {} },
    };
  }
};

export default success;
