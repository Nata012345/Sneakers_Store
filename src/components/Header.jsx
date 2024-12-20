import React, {useState} from "react";
import { Link } from 'react-router-dom';
import { useCart } from "../hooks/useCart";

function Header(props) {
    const { totalPrice } = useCart();

    return (
        <header className="d-flex justify-between align-center p-40">
            <Link to="/Sneakers_Store/">
                <div className="d-flex align-center">
                    <img width={40} height={40} src="./images/logo.png" alt="logo"/>
                    <div>
                        <h3 className="text-uppercase o">sneakers</h3>
                        <p>Shop the best sneakers</p>
                    </div>
                </div>
            </Link>
            <ul className="d-flex ">
                <li className="mr-30 cu-p" onClick={props.onClickCart}>
                    <img width={18} height={18} src="./images/cart.svg" alt="Cart" />
                    <span>{totalPrice} $</span>
                </li>
                <li className="mr-20 cu-p">
                    <Link to="/Sneakers_Store/favorites">
                        <img width={18} height={18} src="./images/favorite-header.svg" alt="Favorite"/>
                    </Link>
                </li>
                <li>
                    <Link to="/Sneakers_Store/orders">
                        <img width={18} height={18} src="./images/profile.svg" alt="User"/>
                    </Link>
                </li>
            </ul>
        </header>
    )
}

export default Header;