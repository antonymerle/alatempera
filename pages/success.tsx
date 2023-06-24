import Success from "@/components/Success";
import { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { CustomerDetails } from "@/types/types";

const success = ({
  customerDetails,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <Success {...customerDetails} />;
};

export const getServerSideProps: GetServerSideProps<{
  customerDetails: CustomerDetails;
}> = async (context) => {
  const stripeSessionID = context.query.session_id;

  const res = await fetch(`${process.env.BASE_DOMAIN_URL}/api/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ session_id: stripeSessionID }),
  });

  if (res.status >= 400) {
    console.log("error, returning null");

    return {
      props: {
        customerDetails: null, // Provide a default value for data when an error occurs
      },
    };
  }

  const customerDetails = await res.json();

  console.log("*** api_checkout response ***");
  console.log({ customerDetails });

  return {
    props: { customerDetails },
  };
};

export default success;
