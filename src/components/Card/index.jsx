import React, {useState} from "react";

import styles from "./Card.module.scss";

export default function Card({
                                 id,
                                 imgUrl,
                                 title,
                                 price,
                                 onCartPlus,
                                 onFavoritePlus,
                                 favorited = false
}) {
    const [isAdded, setIsAdded] = useState(false);
    const [isFavorite, setIsFavorite] = useState(favorited);

    console.log("onFavoritePlus function:", onFavoritePlus);

    const onClickPlus = () => {
        onCartPlus({id, imgUrl, title, price});
        setIsAdded(!isAdded);
    }
    const onClickFavorite = () => {
        console.log('click onClickFavorite')
        onFavoritePlus({id, imgUrl, title, price});
        setIsFavorite(!isFavorite);
    }
    return (
        <div className={styles.card}>
            <div className={styles.favorite} onClick={onClickFavorite}>
                <img src={isFavorite ? "/images/favorite-like.svg" : "/images/favorite.svg"} alt="Unliked"/>
            </div>
            <img width={133} height={112} src={imgUrl} alt="Sneakers"/>
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column ">
                    <span>Price: </span>
                    <b>{price} $</b>
                </div>
                <img className={styles.plus} onClick={onClickPlus}
                     src={isAdded ? "/images/choose.svg" : "/images/plus.png"} alt="Plus"/>
            </div>
        </div>
    )
}

