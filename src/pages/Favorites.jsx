import React, {useState} from "react";
import Card from "../components/Card";
import { AppContext } from "../App";

import Nofavorites from "../components/Nofavorites";

function Favorites ({
                        isLoading,
                        onRemoveItem,
                        onAddToCart,
                    }) {
    const { favorites, onAddToFavorite, isFavorite } = React.useContext(AppContext);

    const renderFavoriteItems = () => {
        return (isLoading ? [...Array(10)] : favorites).map((item, index) => (
            <Card
                key={index}
                {...item}
                onFavorite={onAddToFavorite}
                isFavorite = {true}
                isLoading={isLoading}
                onRemoveCartPlus={(obj) => onRemoveItem(obj)}
                onCartPlus={(obj) => onAddToCart(obj)}
            />
        ))
    }
    return <section className="content p-40">
        <div className="d-flex justify-between align-center mb-40">
            {
                (favorites && favorites.length > 0) ? <h1>Favorite items</h1> : ""
            }
        </div>
        <div className="cards d-flex flex-wrap">
            {
                // Array.isArray(favorites) && renderFavoriteItems()
                (favorites && favorites.length > 0)
                    ?
                    renderFavoriteItems()
                    : <Nofavorites
                        title="There is no favorites"
                        description="You haven't added anything to favorites"
                        image="/images/noFavoritesSmile.png"
                    />
            }
        </div>
    </section>
}

export default Favorites;

