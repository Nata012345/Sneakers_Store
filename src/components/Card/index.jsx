import React, {useState} from "react";

import styles from "./Card.module.scss";

export default function Card({
                                 id,
                                 // dbKey=null,
                                 imgUrl,
                                 title,
                                 price,
                                 onCartPlus,
                                 onFavorite,
                                 onRemoveCartPlus,
                                 isFavofite = false,
                                 isCart = false,

                                 favorited = false
}) {
    //const [isAdded, setIsAdded] = useState(false);
    //const [isFavorite, setIsFavorite] = useState(favorited);

    const onClickPlus = () => {
        if (isCart) {
            onRemoveCartPlus({id, imgUrl, title, price, isCart: !isCart})
        }
        onCartPlus({id, imgUrl, title, price, isCart: !isCart });
        //setIsAdded(!isAdded);
    }
    const onClickFavorite = () => {
        onFavorite({id, imgUrl, title, price,  isFavofite: !isFavofite});
       // setIsFavorite(!isFavorite);
    }
    return (
        <div className={styles.card}>
            <div className={styles.favorite} onClick={onClickFavorite}>
                <img src={isFavofite ? "/images/favorite-like.svg" : "/images/favorite.svg"} alt="Unliked"/>
            </div>
            <img width={133} height={112} src={imgUrl} alt="Sneakers"/>
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column ">
                    <span>Price: </span>
                    <b>{price} $</b>
                </div>
                <img className={styles.plus} onClick={onClickPlus}
                     src={isCart ? "/images/choose.svg" : "/images/plus.png"} alt="Plus"/>
            </div>
        </div>
    )
}

