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
        amount: 3000,
        currency: "eur",
      },
      display_name: "International Shipping",
      delivery_estimate: {
        minimum: {
          unit: "business_day",
          value: 3,
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
          value: 7,
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
        amount: 1000,
        currency: "eur",
      },
      display_name: "Europe shipping",
      delivery_estimate: {
        minimum: {
          unit: "business_day",
          value: 3,
        },
        maximum: {
          unit: "business_day",
          value: 7,
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
        amount: 1500,
        currency: "eur",
      },
      display_name: "Next day air",
      delivery_estimate: {
        minimum: {
          unit: "business_day",
          value: 3,
        },
        maximum: {
          unit: "business_day",
          value: 7,
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
        amount: 2000,
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

// export const south_america_shipping = [
//   {
//     shipping_rate_data: {
//       type: "fixed_amount",
//       fixed_amount: {
//         amount: 30000,
//         currency: "eur",
//       },
//       display_name: "Next day air",
//       delivery_estimate: {
//         minimum: {
//           unit: "business_day",
//           value: 3,
//         },
//         maximum: {
//           unit: "business_day",
//           value: 7,
//         },
//       },
//     },
//   },
// ];

// export const asia_shipping = [
//   {
//     shipping_rate_data: {
//       type: "fixed_amount",
//       fixed_amount: {
//         amount: 30000,
//         currency: "eur",
//       },
//       display_name: "Next day air",
//       delivery_estimate: {
//         minimum: {
//           unit: "business_day",
//           value: 3,
//         },
//         maximum: {
//           unit: "business_day",
//           value: 7,
//         },
//       },
//     },
//   },
// ];

// export const middle_east_shipping = [
//   {
//     shipping_rate_data: {
//       type: "fixed_amount",
//       fixed_amount: {
//         amount: 1500,
//         currency: "eur",
//       },
//       display_name: "Next day air",
//       delivery_estimate: {
//         minimum: {
//           unit: "business_day",
//           value: 3,
//         },
//         maximum: {
//           unit: "business_day",
//           value: 7,
//         },
//       },
//     },
//   },
// ];

// export const africa_shipping = [
//   {
//     shipping_rate_data: {
//       type: "fixed_amount",
//       fixed_amount: {
//         amount: 1500,
//         currency: "eur",
//       },
//       display_name: "Next day air",
//       delivery_estimate: {
//         minimum: {
//           unit: "business_day",
//           value: 3,
//         },
//         maximum: {
//           unit: "business_day",
//           value: 7,
//         },
//       },
//     },
//   },
// ];

// export const shipping_options = [
//   {
//     shipping_rate_data: {
//       type: "fixed_amount",
//       fixed_amount: {
//         amount: 0,
//         currency: "eur",
//       },
//       display_name: "Free shipping",
//       delivery_estimate: {
//         minimum: {
//           unit: "business_day",
//           value: 5,
//         },
//         maximum: {
//           unit: "business_day",
//           value: 7,
//         },
//       },
//     },
//   },
//   {
//     shipping_rate_data: {
//       type: "fixed_amount",
//       fixed_amount: {
//         amount: 1500,
//         currency: "eur",
//       },
//       display_name: "Next day air",
//       delivery_estimate: {
//         minimum: {
//           unit: "business_day",
//           value: 1,
//         },
//         maximum: {
//           unit: "business_day",
//           value: 1,
//         },
//       },
//     },
//   },
// ];

// export const foreign_shipping_options = [
//   {
//     shipping_rate_data: {
//       type: "fixed_amount",
//       fixed_amount: {
//         amount: 0,
//         currency: "eur",
//       },
//       display_name: "Free shipping",
//       delivery_estimate: {
//         minimum: {
//           unit: "business_day",
//           value: 5,
//         },
//         maximum: {
//           unit: "business_day",
//           value: 7,
//         },
//       },
//     },
//   },
//   {
//     shipping_rate_data: {
//       type: "fixed_amount",
//       fixed_amount: {
//         amount: 1500,
//         currency: "eur",
//       },
//       display_name: "Next day air",
//       delivery_estimate: {
//         minimum: {
//           unit: "business_day",
//           value: 1,
//         },
//         maximum: {
//           unit: "business_day",
//           value: 1,
//         },
//       },
//     },
//   },
// ];

export default getStripe;
