import React from "react";
import Card from "../components/Card";
import { AppContext } from "../App";

function Favorites () {
    const { favorites, onAddToFavorite } = React.useContext(AppContext);

    return <section className="content p-40">
        <div className="d-flex justify-between align-center mb-40">
            <h1>your favorite items</h1>
        </div>
        <div className="cards d-flex flex-wrap">
            {
                favorites.map((item, index) => (
                    <Card
                        key={index}
                        {...item}
                        favorited={true}
                        onFavorite={onAddToFavorite}
                        isFavofite = {item.isFavofite}
                    />
                ))
            }
        </div>
    </section>
}
export default Favorites;

