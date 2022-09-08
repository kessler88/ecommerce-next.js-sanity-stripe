//this file manage the entire state of our application.
import React, { useState, createContext, useContext, useEffect } from "react";
import { toast } from "react-hot-toast";

//create a context object to be use/call by useContext hook.
const Context = createContext();

//context functional component
export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct;
  let index;

  //add product to cart function
  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    //if product exist in cart then update the items in the cart.
    if (checkProductInCart) {
      //update the actual items in the cart.
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id)
          return {
            ...cartProduct, //spread cart product properties, but update quantity product
            quantity: cartProduct.quantity + quantity,
          };
      });
      setCartItems(updatedCartItems);
    }
    //if product doesn't exist in the cart.
    else {
      product.quantity = quantity;
      //spread all existing carttItem and add a object where we spread our new product
      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${qty} ${product.name} added to the cart.`); //handle by Toaster component
  };

  //remove cart item function
  const onRemove = (id) => {
    foundProduct = cartItems.find((item) => item._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id); 

    setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity);
    setCartItems(newCartItems);
  }

  //function for cart item quantity, accept id of product and action of we're working with
  const toggleCartItemQuantity = (id, action) => { 

    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((item) => item._id === id);

    //only non-mutative method be use on state variables.
    //we shld only just update the current cart item product that we're trying to update  
    //not add new products to cart. 
    if (action === 'inc') {
      setCartItems(cartItems.map((item) => item._id === id ? { ...foundProduct, quantity: foundProduct.quantity + 1 } : item ));
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (action === 'dec') { 
      //the product quantity must > 1 in order to decrement quantity.
      if (foundProduct.quantity > 1) {
        setCartItems(cartItems.map((item) => item._id === id ? { ...foundProduct, quantity: foundProduct.quantity - 1 } : item ));
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  }

  //quantity update funcs
  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;

      return prevQty - 1;
    });
  };

  return (
    //not rendering anything, just wrap the children of StateContext in the Context Provider react component
    //and pass value prop an object of variables and functions that we going to share across the entire application.
    //this allow every single component who are child of Context Provider have access to these state variables and functions
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuantity,
        onRemove,
        setShowCart,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
      }}
    >
      {children}
    </Context.Provider>
  );
};

//export our useStateContext to allow components to import and use it as hook.
export const useStateContext = () => useContext(Context);
