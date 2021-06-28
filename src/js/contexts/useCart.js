import React, {useState} from "react";

export default function () {
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")));

    const newQuantity = (productId, quantity) => {
        return (cart && cart[productId] && cart[productId]["quantity"] ? cart[productId]["quantity"] : 0) + quantity;
    };

    const addParameter = (productId, parametersInfo) => {
        if (!parametersInfo) return [];

        let parameters = cart && cart[productId] && cart[productId]["parameters"] ? cart[productId]["parameters"] : [];

        parameters.push(parametersInfo);

        return parameters;
    };

    const deleteParameter = (productId, key) => {
        let parameters = cart && cart[productId] && cart[productId]["parameters"] ? cart[productId]["parameters"] : [];

        parameters = parameters.filter((parameter, index) => index !== key);

        return parameters;
    };

    return {
        cart, setCart, newQuantity, addParameter, deleteParameter
    }
}
