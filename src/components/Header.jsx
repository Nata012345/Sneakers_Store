import React from "react";

function Header(props) {
    return (
        <header className="d-flex justify-between align-center p-40">
            <div className="d-flex align-center">
                <img width={40} height={40} src="/images/logo.png" alt="logo"/>
                <div>
                    <h3 className="text-uppercase o">sneakers</h3>
                    <p>Shop the best sneakers</p>
                </div>
            </div>
            <ul className="d-flex ">
                <li className="mr-30 cu-p" onClick={props.onClickCart}>
                    <img width={18} height={18} src="/images/cart.svg" alt="Cart"/>
                    <span>30$</span>
                </li>
                <li>
                    <img width={18} height={18} src="/images/profile.svg" alt="Cart"/>
                </li>
            </ul>
        </header>
    )
}
export default Header;