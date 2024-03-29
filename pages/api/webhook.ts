import Stripe from "stripe";
import dbConnect from "@/models/connection";
import Order from "@/models/orders";
import Work from "@/models/works";
import Print from "@/models/print";
import type { NextApiRequest, NextApiResponse } from "next";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET ?? "nope";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 1. retrieve email from user session to record the order later
  // The email is passed to fulfillOrder()

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2022-11-15",
  });

  if (req.method === "POST") {
    const sig: string | string[] = req.headers["stripe-signature"] ?? "nope";

    // console.log({ sig });

    // console.log({
    //   STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    //   STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    // });

    console.log("**** ENTERING WEBHOOK ****");

    // let event = Stripe.Event;
    let event: any = {};

    try {
      const body: any = await buffer(req);

      event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (err: any) {
      console.log(`❌ Error message: ${err.message}`);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // for reference, check the event object in Stripe documentation
    // https://stripe.com/docs/api/events/object
    // console.log("✅ Success:", event.id);

    switch (event.type) {
      case "checkout.session.completed":
        try {
          const customerEmailFromCheckoutSession =
            event.data.object.customer_details.email ?? "";
          const customerNameFromCheckoutSession =
            event.data.object.customer_details.name ?? "";
          const paymentIntentId = event.data.object.payment_intent ?? "";

          // console.log({ customerEmailFromCheckoutSession });
          // console.log({ customerNameFromCheckoutSession });
          // TODO : stocker cet event en DB. les donnes sont dans event.data.

          // Then define and call a function to handle the event payment_intent.succeeded
          // console.log("Le client a payé sa commande.");
          // console.log({ event });
          const completedCheckoutSessionTimestamp = event.created * 1000; // stripe timestamp is measured in seconds since the Unix epoch.
          // Retrieve the session. If you require line items in the response, you may include them by expanding line_items.
          const sessionWithLineItems: any =
            await stripe.checkout.sessions.retrieve(event.data.object.id, {
              expand: ["line_items"],
            });

          // console.log("*** checkout session object ***");
          // console.log(JSON.stringify(sessionWithLineItems, null, 3));

          // cf documentation : line_items : https://stripe.com/docs/api/checkout/sessions/object#checkout_session_object-line_items
          // console.log("*** line items ***");
          // console.log(
          //   JSON.stringify(sessionWithLineItems.line_items.data, null, 2)
          // );

          // console.log("*** metadata : commandDetails ***");

          const commandDetails = JSON.parse(
            sessionWithLineItems.metadata.commandDetails
          );
          // console.log({ commandDetails });

          const lineItems = sessionWithLineItems.line_items.data.map(
            (lineItem: any, i: number) => {
              return {
                // custom metadata passed in the line_items object in /api/stripe
                item_id: commandDetails[i].id,
                productType: commandDetails[i].type,
                productTitle: commandDetails[i].title,
                quantity: commandDetails[i].quantity,

                // stripe regular data
                line_id: lineItem.id,
                amount_discount: lineItem.amount_discount,
                amount_subtotal: lineItem.amount_subtotal,
                amount_tax: lineItem.amount_tax,
                amount_total: lineItem.amount_total,
                currency: lineItem.currency,
              };
            }
          );

          console.log("*** lineItems ***");
          console.log({ lineItems });

          // Fulfill the purchase && decrement inventory...
          const response = await fulfillOrder(
            customerNameFromCheckoutSession,
            customerEmailFromCheckoutSession,
            paymentIntentId,
            completedCheckoutSessionTimestamp,
            lineItems
          );
          console.log({ fulfillOrder: response });

          break;
        } catch (error) {
          console.error("Error fulfilling order:", error);
          return res.status(500).send(`Error fulfilling order: ${error}`);
        }

      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    res.status(200).json({ checkoutSessionCompleted: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}

const buffer = (req: NextApiRequest) => {
  return new Promise((resolve, reject) => {
    const chunks: any[] = [];

    req.on("data", (chunk) => {
      chunks.push(chunk);
    });

    req.on("end", () => {
      resolve(Buffer.concat(chunks));
    });

    req.on("error", reject);
  });
};

const fulfillOrder = async (
  customerNameFromCheckoutSession: string,
  customerEmailFromCheckoutSession: string,
  paymentIntentId: string,
  completedCheckoutSessionTimestamp: number,
  lineItems: any
) => {
  console.log("entering fulfillOrder");
  // console.log({ customerNameFromCheckoutSession });
  // console.log({ customerEmailFromCheckoutSession });
  // console.log({ paymentIntentId });
  // console.log({ completedCheckoutSessionTimestamp });
  // console.log({ lineItems });

  // await dbConnect();

  // const data = await Work.find({});

  // data.forEach((work) => console.log(work.title_fr));

  try {
    //   // 1. record order in database
    const newOrder = new Order({
      customerName: customerNameFromCheckoutSession,
      customerEmail: customerEmailFromCheckoutSession,
      paymentIntentId,
      timestamp: completedCheckoutSessionTimestamp,
      items: lineItems,
    });

    await newOrder
      .save()
      .then(() => {
        Order.findOne({ paymentIntentId });
      })
      .then((data: any) => console.log(data));
  } catch (error) {
    console.log("Error recording order in database:", error);
  }

  // 2. decrement inventory
  console.log("decremeting inventory");

  for await (const lineItem of lineItems) {
    if (lineItem.productType === "original") {
      let work = await Work.findById(lineItem.item_id);
      work.inventory -= lineItem.quantity;
      await work.save().then((data: any) => console.log(data));
    } else if (lineItem.productType === "print") {
      let print = await Print.findById(lineItem.item_id);
      print.inventory -= lineItem.quantity;
      await print.save().then((data: any) => console.log(data));
    }
  }

  // lineItems.forEach(async (lineItem: any) => {
  //   try {
  //     switch (lineItem.productType) {
  //       case "original":
  //         console.log("Product is an original work");
  //         console.log("test");

  //         // let item = await Work.findById(lineItem.item_id);
  //         const workData = await Work.findOne({ _id: lineItem.item_id });
  //         let work = JSON.parse(JSON.stringify(workData));
  //         console.log({ work });

  //         work.inventory -= lineItem.quantity;
  //         console.log("new item inventory", work.inventory);

  //         await work.save().then((data: any) => console.log(data));
  //         // console.log(`Quantity updated for work with ID ${item._id}`);
  //         break;

  //       case "print":
  //         const printData = await Print.findById(lineItem.item_id);

  //         let print = JSON.parse(JSON.stringify(printData));
  //         print.inventory -= lineItem.quantity;
  //         console.log("new item inventory", print.inventory);

  //         await print.save().then((data: any) => console.log(data));
  //         console.log(`Quantity updated for work with ID ${print._id}`);
  //         break;

  //       default:
  //         console.log("Unknown product type : " + lineItem.productType);
  //         break;
  //     }

  // if (item) {

  // }
  // } catch (error) {
  //   console.error(
  //     `Error updating quantity for work with title ${lineItem.description}: ${error}`
  //   );
  // }
  // });
};

// Function to update the user document with new orders
// TODO : rewire or not updateUserWithNewOrders
// const updateUserWithNewOrders = async (
//   completedCheckoutSessionId,
//   completedCheckoutSessionTimestamp,
//   userEmail,
//   newOrder
// ) => {
//   try {
//     // Fetch the existing user document
//     const existingUser = await client.fetch(
//       `*[_type == "user" && email == $userEmail][0]`,
//       { userEmail }
//     );

//     const lines = newOrder.map((order) => {
//       return {
//         _key: order.id,
//         line_id: order.id,
//         object: order.object,
//         amount_discount: order.amount_discount,
//         amount_subtotal: order.amount_subtotal,
//         amount_tax: order.amount_tax,
//         amount_total: order.amount_total,
//         currency: order.currency,
//         description: order.description,

//         quantity: order.quantity,
//       };
//     });

//     let newOrderDocument = {
//       _type: "order",
//       customer: {
//         _ref: existingUser._id,
//       },
//       command_id: completedCheckoutSessionId,
//       timestamp: completedCheckoutSessionTimestamp,
//       items: lines,
//     };

//     await client.create(newOrderDocument);

//     console.log("User document updated with new orders successfully");
//   } catch (error) {
//     console.error("Error updating user document:", error);
//   }
// };

export const config = {
  api: {
    bodyParser: false,
  },
};
