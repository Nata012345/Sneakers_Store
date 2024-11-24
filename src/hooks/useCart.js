import React from "react";
import { AppContext } from "../App";

export const useCart = () => {
    const { cartItems, setCartItems } = React.useContext(AppContext);
    const totalPrice = cartItems.reduce((summ, item) => summ + item.price, 0);

    return { cartItems, setCartItems, totalPrice };
}