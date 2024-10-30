import React from "react";

import styles from "./Card.module.scss";

export default function Card(props) {
    const onCliclButton = () => {
        alert(props.title);
    }
    return (
        <div className={styles.card}>
            <div className={styles.favorite}>
                <img src="/images/favorite.svg" alt="Unliked"/>
            </div>
            <img width={133} height={112} src={props.imgUrl} alt="Sneakers"/>
            <h5>{props.title}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column ">
                    <span>Price: </span>
                    <b>{props.price} $</b>
                </div>
                <button onClick={props.onClick} className={styles.button}>
                    <img width={11} height={11} src="/images/plus.svg" alt="Plus"/>
                </button>
            </div>
        </div>
    )
}

