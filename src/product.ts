const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

interface Product {
  id: number;
  price: number;
  image: string;
  name: string;
}

const createPrice = async (productId: string, amount: number) => {
  return await stripe.prices.create({
    product: productId,
    currency: "pln",
    unit_amount: amount * 100,
  });
};

const createProduct = async (product: Product) => {
  try {
    const stripeProduct = await stripe.products.create({
      name: product.name,
      images: [product.image],
    });

    const price = await createPrice(stripeProduct.id, product.price);

    return {
      stripeProduct,
      price,
    };
  } catch (error) {
    console.error("Error creating product and price:", error);
    throw error;
  }
};

const createLineItems = async (products: Product[]): Promise<any[]> => {
  const lineItems = [];
  for (const product of products) {
    try {
      const { stripeProduct, price } = await createProduct(product);
      lineItems.push({
        price: price.id,
        quantity: 1,
      });
    } catch (error) {
      console.error("Error processing product:", product.name, error);
    }
  }
  return lineItems;
};

exports.createLineItems = createLineItems;
