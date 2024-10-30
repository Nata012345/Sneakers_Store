import React from "react";

export default function Card() {
    return (
        <div className="card">
            <div className="favorite">
                <img src="/images/favorite.svg" alt="Unliked"/>
            </div>
            <img width={133} height={112} src="/images/sneakers/image%201.jpg" alt="Sneakers"/>
            <h5>Nike Blazer Mid Suede</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column ">
                    <span>Price: </span>
                    <b>213$</b>
                </div>
                <button className="button">
                    <img width={11} height={11} src="/images/plus.svg" alt="Plus"/>
                </button>
            </div>
        </div>
    )
}

