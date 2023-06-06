import { loadStripe } from "@stripe/stripe-js";
import { Stripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null>;

const getStripe = async () => {
  const key = `${process.env.STRIPE_PUBLISHABLE_KEY}`;
  if (!stripePromise) stripePromise = loadStripe(key);

  return stripePromise;
};

export const shipping_options = [
  {
    shipping_rate_data: {
      type: "fixed_amount",
      fixed_amount: {
        amount: 0,
        currency: "eur",
      },
      display_name: "Free shipping",
      delivery_estimate: {
        minimum: {
          unit: "business_day",
          value: 5,
        },
        maximum: {
          unit: "business_day",
          value: 7,
        },
      },
    },
  },
  {
    shipping_rate_data: {
      type: "fixed_amount",
      fixed_amount: {
        amount: 1500,
        currency: "eur",
      },
      display_name: "Next day air",
      delivery_estimate: {
        minimum: {
          unit: "business_day",
          value: 1,
        },
        maximum: {
          unit: "business_day",
          value: 1,
        },
      },
    },
  },
];

export default getStripe;
