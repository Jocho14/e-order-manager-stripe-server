const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

const CURRENCY = "pln";
const QUANTITY = 1;

interface ProductDataProps {
  imageUrl: string[];
  name: string;
}

interface PriceDataProps {
  price: number;
  currency: string;
}

interface ProductProps extends ProductDataProps, PriceDataProps {
  quantity: number;
}

const createLineItem = (product: ProductProps) => {
  return {
    price_data: {
      currency: CURRENCY,
      product_data: {
        name: product.name,
        images: [product.imageUrl],
      },
      unit_amount: product.price * 100, // unit_amount in fractional currency
    },
    quantity: QUANTITY,
  };
};

const createLineItems = (products: ProductProps[]) => {
  products.forEach((product) => console.log(product));
  return products.map(createLineItem);
};
exports.createLineItems = createLineItems;
