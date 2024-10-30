import React from "react";

function Drawer() {
    return (
        <div style={{display: 'none'}} className="overlay ">
            <div className="drawer d-flex flex-column">
                <h2
                    className="d-flex justify-between">Basket
                    <img className="removeBtn cu-p"
                         src="/images/btn-remove.svg"
                         alt="Remove button"/>
                </h2>

                <div className="items">
                    <div className="cartItem d-flex align-center">
                        <div
                            style={{backgroundImage: 'url(/images/sneakers/image%201.jpg)'}}
                            className="cartItemImg">
                        </div>
                        <div>
                            <p className="mb-5">Nike Blazer Mid Suede</p>
                            <span>Price: </span>
                            <b>213$</b>
                        </div>
                        <img className="removeBtn" src="/images/btn-remove.svg" alt="Remove button"/>
                    </div>
                    <div className="cartItem d-flex align-center">
                        <div
                            style={{backgroundImage: 'url(/images/sneakers/image%201.jpg)'}}
                            className="cartItemImg">
                        </div>
                        <div>
                            <p className="mb-5">Nike Blazer Mid Suede</p>
                            <span>Price: </span>
                            <b>213$</b>
                        </div>
                        <img className="removeBtn" src="/images/btn-remove.svg" alt="Remove button"/>
                    </div>
                    <div className="cartItem d-flex align-center">
                        <div
                            style={{backgroundImage: 'url(/images/sneakers/image%201.jpg)'}}
                            className="cartItemImg">
                        </div>
                        <div>
                            <p className="mb-5">Nike Blazer Mid Suede</p>
                            <span>Price: </span>
                            <b>213$</b>
                        </div>
                        <img className="removeBtn" src="/images/btn-remove.svg" alt="Remove button"/>
                    </div>
                </div>

                <div className="totalInfo d-flex flex-column">
                    <ul className="total d-flex flex-column">
                        <li className="d-flex">
                            <span>Total:</span>
                            <div></div>
                            <span>30 $</span>
                        </li>
                        <li className="d-flex">
                            <span>Tax 7%:</span>
                            <div></div>
                            <span>2 $</span>
                        </li>
                    </ul>
                    <button className="greenButton">Make your oder
                        <img src="/images/arrow-total.svg" alt="Arrow"/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Drawer;

