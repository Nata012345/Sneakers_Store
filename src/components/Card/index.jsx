import React, {useState} from "react";
import ContentLoader from "react-content-loader";

import { AppContext } from "../../App";

import styles from "./Card.module.scss";

export default function Card({
                                 id,
                                 imgUrl,
                                 title,
                                 price,
                                 onCartPlus,
                                 onFavorite,
                                 onRemoveCartPlus,
                                 isLoading = false,
                                 isFavofite = false,
                                 isCart = false,
                                 // added = false,
                                 favorited = false
}) {
    const { isItemAdded } = React.useContext(AppContext);
    //const [isFavorite, setIsFavorite] = useState(favorited);

    console.log(title, isItemAdded(id));

    const onClickPlus = () => {
        onCartPlus({id, imgUrl, title, price, isCart: isCart });
    }
    const onClickFavorite = () => {
        onFavorite({id, imgUrl, title, price,  isFavofite: !isFavofite});
       // setIsFavorite(!isFavorite);
    }
    return (
        <div className={styles.card}>
            {isLoading ? (
                <ContentLoader
                    speed={2}
                    width={165}
                    height={250}
                    viewBox="0 0 150 200"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                >
                <rect x="0" y="0" rx="10" ry="10" width="150" height="91" />
                <rect x="0" y="105" rx="5" ry="5" width="150" height="15" />
                <rect x="0" y="130" rx="5" ry="5" width="94" height="15" />
                <rect x="0" y="172" rx="5" ry="5" width="80" height="24" />
                <rect x="124" y="165" rx="10" ry="10" width="32" height="32" />
                </ContentLoader>
                ) : (
        <>
            <div className={styles.favorite} onClick={onClickFavorite}>
                <img src={isFavofite ? "/images/favorite-like.svg" : "/images/favorite.svg"} alt="Unliked"/>
            </div>
            <img width="100%" height={135} src={imgUrl} alt="Sneakers"/>
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column ">
                    <span>Price: </span>
                    <b>{price} $</b>
                </div>
                <img className={styles.plus} onClick={onClickPlus}
                     src={isItemAdded(id) ? "/images/choose.svg" : "/images/plus.png"} alt="Plus"/>
            </div>
        </>
        )
}
</div>
)}

