import { Request, Response } from "express";

const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

//const DOMAIN = "http://localhost:5173";
const DOMAIN = "https://master--e-order-manager.netlify.app";

const { createLineItems } = require("./product");

const createCheckoutSession = async (req: Request, res: Response) => {
  const lineItems = createLineItems(req.body.products);
  console.log(lineItems[0].product_data);

  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    line_items: lineItems,
    mode: "payment",
    return_url: `${DOMAIN}/return?session_id={CHECKOUT_SESSION_ID}`,
  });

  res.send({ clientSecret: session.client_secret });
};
exports.createCheckoutSession = createCheckoutSession;

const getSessionStatus = async (req: Request, res: Response) => {
  const session = await stripe.checkout.sessions.retrieve(
    req.query.session_id,
    {
      expand: ["line_items.data.price.product"],
    }
  );

  const lineItems = session.line_items.data.map(
    (item: {
      id: number;
      description: string;
      quantity: number;
      price: { product: { metadata: any } };
    }) => ({
      id: item.id,
      description: item.description,
      quantity: item.quantity,
      product_metadata: item.price.product.metadata,
    })
  );

  console.log("shit line items: ", lineItems);

  res.send({
    status: session.status,
    customer_email: session.customer_details.email,
    line_items: lineItems,
  });
};
exports.getSessionStatus = getSessionStatus;

const getTestLog = async (req: Request, res: Response) => {
  res.send({ id: 1, name: "test" });
};
exports.getTestLog = getTestLog;
