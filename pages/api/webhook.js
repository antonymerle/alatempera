import Stripe from "stripe";
import OrderModel from "@/models/orders";
import Work from "@/models/works";
import Print from "@/models/print";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export default async function handler(req, res) {
  // 1. retrieve email from user session to record the order later
  // The email is passed to fulfillOrder()

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2022-11-15",
  });

  if (req.method === "POST") {
    const sig = req.headers["stripe-signature"];

    console.log({ sig });

    console.log({
      STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
      STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    });

    console.log("**** ENTERING WEBHOOK ****");

    let event = Stripe.Event;

    try {
      const body = await buffer(req);

      event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (err) {
      console.log(`❌ Error message: ${err.message}`);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // for reference, check the event object in Stripe documentation
    // https://stripe.com/docs/api/events/object
    console.log("✅ Success:", event.id);

    switch (event.type) {
      case "checkout.session.completed":
        const customerEmailFromCheckoutSession =
          event.data.object.customer_details.email ?? "";
        const customerNameFromCheckoutSession =
          event.data.object.customer_details.name ?? "";
        const paymentIntentId = event.data.object.payment_intent ?? "";

        console.log({ customerEmailFromCheckoutSession });
        console.log({ customerNameFromCheckoutSession });
        // TODO : stocker cet event en DB. les donnes sont dans event.data.

        // Then define and call a function to handle the event payment_intent.succeeded
        console.log("Le client a payé sa commande.");
        console.log({ event });
        const completedCheckoutSessionTimestamp = event.created * 1000; // stripe timestamp is measured in seconds since the Unix epoch.
        // Retrieve the session. If you require line items in the response, you may include them by expanding line_items.
        const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
          event.data.object.id,
          {
            expand: ["line_items"],
          }
        );

        console.log("*** checkout session object ***");
        console.log(JSON.stringify(sessionWithLineItems, null, 3));

        // cf documentation : line_items : https://stripe.com/docs/api/checkout/sessions/object#checkout_session_object-line_items
        console.log("*** line items ***");
        console.log(
          JSON.stringify(sessionWithLineItems.line_items.data, null, 2)
        );

        console.log("*** metadata : commandDetails ***");

        const commandDetails = JSON.parse(
          sessionWithLineItems.metadata.commandDetails
        );
        console.log({ commandDetails });

        const lineItems = sessionWithLineItems.line_items.data.map(
          (lineItem, i) => {
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
        // return res.status(200).json(response);

        break;
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

const buffer = (req) => {
  return new Promise((resolve, reject) => {
    const chunks = [];

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
  customerNameFromCheckoutSession,
  customerEmailFromCheckoutSession,
  paymentIntentId,
  completedCheckoutSessionTimestamp,
  lineItems
) => {
  // 1. record order in database

  const newOrder = new OrderModel({
    customerName: customerNameFromCheckoutSession,
    customerEmail: customerEmailFromCheckoutSession,
    paymentIntentId,
    timestamp: completedCheckoutSessionTimestamp,
    items: lineItems,
  });

  newOrder
    .save()
    .then(() => {
      OrderModel.findOne({ paymentIntentId });
    })
    .then((data) => console.log(data));

  // 2. decrement inventory
  //   console.log("Fulfilling order", lineItems);
  console.log("decremeting inventory");

  lineItems.forEach(async (lineItem) => {
    try {
      let item;

      switch (lineItem.productType) {
        case "original":
          item = await Work.findById(lineItem.item_id);
          break;

        case "print":
          item = await Print.findById(lineItem.item_id);
          break;

        default:
          console.log("Unknown product type : " + lineItem.productType);
          break;
      }

      if (item) {
        item.inventory -= lineItem.quantity;

        await item.save();
        console.log(`Quantity updated for work with ID ${item._id}`);
      }
    } catch (error) {
      console.error(
        `Error updating quantity for work with title ${lineItem.description}: ${error}`
      );
    }
  });

  //   const quantityOrdered = lineItems.data[0].quantity;
  //   const productName = lineItems.data[0].description;

  //   console.log({ quantityOrdered });

  //   const groqQuery = `*[_type == "product" && name == $productName][0]`;

  //   const productInDB = await client.fetch(groqQuery, {
  //     productName,
  //   });

  //   console.log({ productInDB });

  //   await client
  //     .patch(productInDB._id)
  //     .dec({ inventory: quantityOrdered })
  //     .commit()
  //     .then((updatedProduct) => {
  //       console.log("New inventory has been decreased by : ", quantityOrdered);
  //       console.log(updatedProduct);
  //       return {
  //         result: true,
  //         inventory: productInDB.inventory - quantityOrdered,
  //       };
  //     });
};

// Function to update the user document with new orders
const updateUserWithNewOrders = async (
  completedCheckoutSessionId,
  completedCheckoutSessionTimestamp,
  userEmail,
  newOrder
) => {
  try {
    // Fetch the existing user document
    const existingUser = await client.fetch(
      `*[_type == "user" && email == $userEmail][0]`,
      { userEmail }
    );

    const lines = newOrder.map((order) => {
      return {
        _key: order.id,
        line_id: order.id,
        object: order.object,
        amount_discount: order.amount_discount,
        amount_subtotal: order.amount_subtotal,
        amount_tax: order.amount_tax,
        amount_total: order.amount_total,
        currency: order.currency,
        description: order.description,
        // price: newOrder.price,         // TODO : map the price object to schema
        quantity: order.quantity,
      };
    });

    let newOrderDocument = {
      _type: "order",
      customer: {
        _ref: existingUser._id,
      },
      command_id: completedCheckoutSessionId,
      timestamp: completedCheckoutSessionTimestamp,
      items: lines,
    };

    // Append the new orders to the existing orders array
    // let updatedOrders = [];
    // if (existingUser.orders?.length > 0) {
    //   updatedOrders = [...existingUser.orders, ...filteredNewOrders];
    // } else {
    //   updatedOrders = [...filteredNewOrders];
    // }

    // console.log({ updatedOrders });

    // Update the user document with the new orders
    // await client
    //   .patch(existingUser._id)
    //   .setIfMissing({ orders: [] })
    //   .set({ orders: updatedOrders })
    //   .commit({ autoGenerateArrayKeys: true });

    await client.create(newOrderDocument);

    console.log("User document updated with new orders successfully");
  } catch (error) {
    console.error("Error updating user document:", error);
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};
