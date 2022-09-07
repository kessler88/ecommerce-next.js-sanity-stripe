import React from "react";
import { Toaster } from "react-hot-toast";

import "../styles/globals.css";
import { Layout } from "../components";
import { StateContext } from "../context/StateContext";

function MyApp({ Component, pageProps }) {
  //<Component {...pageProps} /> means the component we're currently on.
  //so, if we're in a product details page that is the Component,
  //if we're in the home page that is going to be the Component
  return (
    // this allow the data in StateContext to have access by all child components.
    <StateContext>
      {/* wrap our current page/component with layout to have formate each page in same manner 
       Toaster component is for the small notifications (aka toast) messages*/}
      <Layout>
        <Toaster/> 
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  );
}

export default MyApp;
