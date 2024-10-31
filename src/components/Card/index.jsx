import React, {useRef, useState} from "react";

import styles from "./Card.module.scss";

export default function Card({ imgUrl, title, price, onCartPlus, onFavoritPlus }) {
    const [ isAdded, setIsAdded] = useState(false);

    const onClickPlus = () => {
        onCartPlus({ imgUrl, title, price });
        setIsAdded(!isAdded);
    }

    return (
        <div className={styles.card}>
            <div className={styles.favorite} onClick={onFavoritPlus}>
                <img src="/images/favorite.svg" alt="Unliked"/>
            </div>
            <img width={133} height={112} src={imgUrl} alt="Sneakers"/>
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column ">
                    <span>Price: </span>
                    <b>{price} $</b>
                </div>
                <img className={styles.plus} onClick={onClickPlus} src={isAdded ? "/images/choose.svg" : "/images/plus.png" } alt="Plus"/>
            </div>
        </div>
    )
}

