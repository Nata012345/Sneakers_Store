import React from "react";

function Drawer({ onClose, items=[], onRemove }) {
    const handleRemoveClick = (sneaker) => {
        onRemove(sneaker);
        // sneaker.isCart = false;
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
                                    <div key={sneaker.firestoreKey} className="cartItem d-flex align-center justify-between">
                                        <div
                                            style={{backgroundImage: `url(${sneaker.imgUrl})`}}
                                            className="cartItemImg">
                                        </div>
                                        <div>
                                            <p className="mb-5">{sneaker.title}</p>
                                            <span>Price: </span>
                                            <b>{sneaker.price} $</b>
                                        </div>
                                        <img
                                            // onClick={() => onRemove(sneaker)}
                                            // sneaker.isCart = false
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
                            <button className="greenButton">Make your oder
                                <img src="/images/arrow-total.svg" alt="Arrow"/>
                            </button>
                        </div>
                    </> : <div className="cartEmpty d-flex align-center justify-center flex-column flex">
                        <img className="mb-20" width="120px" height="120px" src="/images/empty-cart.png"
                             alt="Empty Cart"/>
                        <h2>Empty Cart</h2>
                        <p className="opacity-6">Please, add at least one sneaker to place an order</p>
                        <button onClick={onClose} className="greenButton">
                            <img  src="/images/arrow-total.svg" alt="Arrow back"/> Go back
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}

export default Drawer;

