import React from "react";
//use Link to link to product details page.
import Link from "next/link";

import { urlFor } from "../lib/client";

//product is the entire object containing data about existing products.
const Product = ({ product: { image, name, slug, price } }) => {
  return (
    <div>
      {/* each product has a link to its product details page based on its slug;  
          slug is a unqiue idetifier for each product. 
          In this case when a user click on a product it leads them to product/[product_slug].js*/}
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <img
            src={urlFor(image && image[0])}
            width={250}
            height={250}
            className="product-image"
          />
          <p className="product-name">{name}</p>
          <p className="product-price">${price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
