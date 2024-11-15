import React, { useState } from "react";
import { AppContext } from "../App";
import Info from "../components/info";

function Drawer({ onClose, items=[], onRemove }) {
    const { setCartItems } = React.useContext(AppContext);
    const [isOrderComplete, setIsOrderComplete] = useState(false);

    const onClickOrder = () => {
        setIsOrderComplete(true);
        setCartItems([]);
    }

    const handleRemoveClick = (sneaker) => {
        onRemove(sneaker);
    }
    return (
        <div className="overlay ">
            <div className="drawer d-flex flex-column">
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
                                            style={{ backgroundImage: `url(${sneaker.imgUrl})` }}
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
                                    <span>30 $</span>
                                </li>
                                <li key="2" className="d-flex">
                                    <span>Tax 7%:</span>
                                    <div></div>
                                    <span>2 $</span>
                                </li>
                            </ul>
                            <button onClick={onClickOrder} className="greenButton">Make your oder
                                <img src="/images/arrow-total.svg" alt="Arrow" />
                            </button>
                        </div>
                    </> : (
                        <Info
                            title={isOrderComplete ? "Order is completed" : "Empty Cart"}
                            description={isOrderComplete ? "Your order #18 will be sent to courier delivery soon" : "Please, add at least one sneaker to place an order"}
                            image={isOrderComplete ? "/images/" : "/images/empty-cart.png"}
                        />
                        )
                }
            </div>
        </div>
    )
}

export default Drawer;

