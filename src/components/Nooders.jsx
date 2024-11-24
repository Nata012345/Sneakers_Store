import React from "react";
import { useNavigate } from "react-router-dom";

const Nooders = ({ image, title, description }) => {
    const navigate = useNavigate();
    const handleGoBack = () => {
        setTimeout(() => {
            navigate("/");
        }, 200)
    }
    return (
        <div className="cartEmpty d-flex align-center justify-center flex-column flex">
            <img className="mb-20" width="70px" height="70px" src={image} alt="Sad Smile"/>
            <h3>{title}</h3>
            <p className="opacity-6">{description}</p>
            <button className="greenButton" onClick={handleGoBack}>
                <img src="/images/arrow-total.svg" alt="Arrow back"/> Go back
            </button>
        </div>
    )
}
export default Nooders;