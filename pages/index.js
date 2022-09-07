import React from "react";
import { Product, FooterBanner, HeroBanner } from "../components";

import { client, urlFor } from "../lib/client";

const Home = ({ products, bannerData }) => {
  return (
    <div>
      {/* if bannerData.length exist/true  */}
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>

      <div className="products-container">
        {products?.map((product) => (
          //provide a key and provide the entire product object as props
          <Product key={product._id} product={product} />
        ))}
      </div>

      <FooterBanner footerBanner = {bannerData && bannerData[0]} />
    </div>
  );
};

//API Call: (An API call, or API request, is a message sent to a server asking an API to provide a service or information.)
//Next.js way of fetching data from server (in this case our server is Sanity)
//getServerSideProps is an async function
//whatever getServerSideProps returns that gets populate/send into our functional component as props
export const getServerSideProps = async () => {
  //sanity query, * means fetch all, in this case fetch all product from Sanity dashboard
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData },
  };
};

export default Home;
