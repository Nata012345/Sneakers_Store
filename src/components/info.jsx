import React from "react";
import { AppContext } from "../App";

const Info = ({ title, description, image }) => {
    const { setCartOpened, setCartItems } = React.useContext(AppContext);

    return (
        <div className="cartEmpty d-flex align-center justify-center flex-column flex">
            <img className="mb-20" width="120px" height="120px" src={image} alt="Empty Cart"/>
            <h3>{title}</h3>
            <p className="opacity-6">{description}</p>
            <button onClick={() => setCartOpened(false)} className="greenButton">
                <img src="./images/arrow-total.svg" alt="Arrow back"/> Go back
            </button>
        </div>
    )
}
export default Info;