import React, { useState } from "react";

import Info from "../info";
import { addOder, removeCart } from "../../firebase/firebaseService";
import { useCart } from "../../hooks/useCart";

import styles from "./Drawer.module.scss";

function Drawer({ onClose, items=[], onRemove, opened }) {
    const { cartItems, setCartItems, totalPrice } = useCart();
    const [orderId, setOrderId] = useState(null);
    const [isOrderComplete, setIsOrderComplete] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const onClickOrder = async () => {
        try {
            setIsLoading(true);
            const result = await addOder({cartItems, userId: "Nata"});
            setOrderId(result.orderObject.orderId || null);
            setIsOrderComplete(true);
            setCartItems([]);
            removeCart();
        } catch (err) {
            console.error("Error adding the order to the orderBack:", err);
        }
        setIsLoading(false);
    }
    const handleRemoveClick = (sneaker) => {
        onRemove(sneaker);
    }
    return (
        <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ""}`}>
            <div className={styles.drawer}>
                <h2 className="d-flex justify-between">Basket
                    <img className="removeBtn cu-p"
                         src="/images/btn-remove.svg"
                         alt="Remove button"
                         onClick={onClose}
                    />
                </h2>
                {
                    items.length > 0 ? <>
                        <div className="items">
                            {
                                items.map((sneaker) => (
                                    <div
                                        key={sneaker.id}
                                        className="cartItem d-flex align-center justify-between">
                                        <div
                                            style={{ backgroundImage: `url("${sneaker.imgUrl}")` }}
                                            className="cartItemImg">
                                        </div>
                                        <div>
                                            <p className="mb-5">{sneaker.title}</p>
                                            <span>Price: </span>
                                            <b>{sneaker.price} $</b>
                                        </div>
                                        <img
                                            onClick={() => handleRemoveClick(sneaker)}
                                            className="removeBtn"
                                            src="/images/btn-remove.svg"
                                            alt="Remove button"/>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="totalInfo d-flex flex-column">
                            <ul className="total d-flex flex-column">
                                <li key="1" className="d-flex">
                                    <span>Total:</span>
                                    <div></div>
                                    <span>{totalPrice} $</span>
                                </li>
                                <li key="2" className="d-flex">
                                    <span>Tax 10%:</span>
                                    <div></div>
                                    <span>{(totalPrice / 100 * 10).toFixed(2)} $</span>
                                </li>
                            </ul>
                            <button
                                onClick={onClickOrder} className="greenButton">Make your oder
                                <img src="/images/arrow-total.svg" alt="Arrow"/>
                            </button>
                        </div>
                    </> : (
                        <Info
                            title={isOrderComplete ? "Order is completed" : "Empty Cart"}
                            description={isOrderComplete ? `Your order #${orderId} will be sent to courier delivery soon.` : "Please, add at least one sneaker to place an order"}
                            image={isOrderComplete ? "./images/orderComplete.jpg" : "./images/empty-cart.png"}
                        />
                    )
                }
            </div>
        </div>
    )
}
export default Drawer;

