import { loadStripe } from "@stripe/stripe-js";
import { Stripe } from "@stripe/stripe-js";
import { ISOCodes } from "@/types/types";

let stripePromise: Promise<Stripe | null>;

const getStripe = async () => {
  const key = `${process.env.STRIPE_PUBLISHABLE_KEY}`;
  if (!stripePromise) stripePromise = loadStripe(key);

  return stripePromise;
};

export const fallback_shipping = [
  {
    shipping_rate_data: {
      type: "fixed_amount",
      fixed_amount: {
        amount: 1200,
        currency: "eur",
      },
      display_name: "International Shipping",
      delivery_estimate: {
        minimum: {
          unit: "business_day",
          value: 10,
        },
        maximum: {
          unit: "business_day",
          value: 30,
        },
      },
    },
  },
];

export const france_shipping = [
  {
    shipping_rate_data: {
      type: "fixed_amount",
      fixed_amount: {
        amount: 700,
        currency: "eur",
      },
      display_name: "Livraison normale",
      delivery_estimate: {
        minimum: {
          unit: "business_day",
          value: 3,
        },
        maximum: {
          unit: "business_day",
          value: 5,
        },
      },
    },
  },
];

export const europe_shipping = [
  {
    shipping_rate_data: {
      type: "fixed_amount",
      fixed_amount: {
        amount: 900,
        currency: "eur",
      },
      display_name: "Europe shipping",
      delivery_estimate: {
        minimum: {
          unit: "business_day",
          value: 5,
        },
        maximum: {
          unit: "business_day",
          value: 10,
        },
      },
    },
  },
];

export const uk_shipping = [
  {
    shipping_rate_data: {
      type: "fixed_amount",
      fixed_amount: {
        amount: 1000,
        currency: "eur",
      },
      display_name: "Next day air",
      delivery_estimate: {
        minimum: {
          unit: "business_day",
          value: 5,
        },
        maximum: {
          unit: "business_day",
          value: 10,
        },
      },
    },
  },
];

export const north_america_shipping = [
  {
    shipping_rate_data: {
      type: "fixed_amount",
      fixed_amount: {
        amount: 1000,
        currency: "eur",
      },
      display_name: "North America Shipping",
      delivery_estimate: {
        minimum: {
          unit: "business_day",
          value: 7,
        },
        maximum: {
          unit: "business_day",
          value: 21,
        },
      },
    },
  },
];

export const countryISOCodes: ISOCodes = {
  europeNoFR: [
    "AT",
    "BE",
    "BG",
    "HR",
    "CY",
    "CZ",
    "DK",
    "EE",
    "FI",
    "DE",
    "GR",
    "HU",
    "IE",
    "IT",
    "LV",
    "LT",
    "LU",
    "MT",
    "NL",
    "PL",
    "PT",
    "RO",
    "SK",
    "SI",
    "ES",
    "SE",
  ],
  northAmerica: ["US", "CA", "MX"],
};

export default getStripe;
