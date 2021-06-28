import React, {createContext, useState} from 'react';
import useCart from "./useCart";
import useCartCounter from "./hooks/useCartCounter";

export const CartContext = createContext({
  cart: localStorage.getItem("cart")
});

export const CartContextProvider = (props) => {
  const {cart, setCart, newQuantity, addParameter, deleteParameter} = useCart();

  const [restaurant, setRestaurant] = useState(JSON.parse(localStorage.getItem("restaurant")));
  const [table, setTable] = useState(JSON.parse(localStorage.getItem("table")));

  const {itemCount, totalPrice} = useCartCounter({cart, setRestaurant});

  const add = (productId, quantity, price, restaurantId, tableId, parametersInfo) => {
    setCart({
      ...cart, [productId]: {
        quantity: newQuantity(productId, quantity),
        price: price,
        parameters: addParameter(productId, parametersInfo)
      }
    });

    setInRestaurant({id: restaurantId});
    setInTable({id: tableId});
  };

  const remove = (productId, quantity, price, key) => {
    let updatedCart = {
      ...cart, [productId]: {
        quantity: newQuantity(productId, -quantity),
        price: price,
        parameters: deleteParameter(productId, key)
      }
    };

    for (let key in updatedCart) {
      if (updatedCart.hasOwnProperty(key)) {
        if (updatedCart[key]["quantity"] <= 0) delete updatedCart[key];
      }
    }

    setCart(updatedCart);
  };

  const setInRestaurant = data => {
    setRestaurant(data);

    localStorage.setItem('restaurant', JSON.stringify(data));
  };

  const setInTable = data => {
    setTable(data);

    localStorage.setItem('Table', JSON.stringify(data));
  };

  const reset = () => {
    setCart(null);
    setRestaurant(null);

    localStorage.removeItem('cart');
    localStorage.removeItem('restaurant');
    localStorage.removeItem('table');
  };

  const editCombo = (productId, parameterId, combo) => {
    let parameters = cart[productId]['parameters'];
    parameters[parameterId] = combo;

    setCart({
      ...cart, [productId]: {
        ...cart[productId],
        parameters: [
          ...parameters,
        ],
      }
    });
  };

  return (
    <CartContext.Provider value={{
      cart: cart,
      setCart,
      restaurant: restaurant,
      setRestaurant,
      table: table,
      setTable,
      itemCount: itemCount,
      totalPrice: totalPrice,
      add: add,
      remove: remove,
      reset: reset,
      editCombo,
    }}>
      {props.children}
    </CartContext.Provider>
  );
}
