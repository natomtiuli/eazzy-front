import React, {useEffect, useState} from "react";

export default function useCartCounter({cart, setRestaurant}) {
  const [itemCount, setItemCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0.00);

  useEffect(() => {
    const [count, price] = countAndPrice();

    setItemCount(count);
    setTotalPrice(Math.round(price * 100) / 100);

    if (count === 0) {
      setRestaurant(null);
      localStorage.removeItem('restaurant');
    }

    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const countAndPrice = () => {
    let count = 0, price = 0;

    for (let key in cart) {
      if (cart.hasOwnProperty(key)) {
        count += cart[key]["quantity"];
        price += cart[key]["quantity"] * cart[key]["price"];

        cart[key]["parameters"].map(parameter => {
          price += parameter["price"];
        });
      }
    }

    return [count, price];
  };

  return {itemCount, totalPrice};
}