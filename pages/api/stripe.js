import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  //fulfilling/handling the post request (api call) to /stripe (b/c file is call stripe.js)
    if (req.method === "POST") {
        //test whether api request/call was made sucessfully by checking the passed data in request body exist or not.
        console.log(req.body); 
    try {
      const params = {
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_options: [
          { shipping_rate: "shr_1Lf7X5LbDRqf63QxPStUV7VO" },
          { shipping_rate: "shr_1Lf7Y1LbDRqf63QxOSegDq2h" },
          ],
        //req.body is the passed cartItems array.
        line_items: req.body.map((item) => {
          const img = item.image[0].asset._ref;
          const newImage = img.replace("image-", "https://cdn.sanity.io/images/g4awvwni/production/").replace("-webp", ".webp");
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.name,
                images: [newImage],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          };
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
      };

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session); //respond with a status code 200, sending back stripe checkout session as JSON object.

    } catch (err) {
      //if this request something goes wrong, respond with a status code 500 send back a JSON object.
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
