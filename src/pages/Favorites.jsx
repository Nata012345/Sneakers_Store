import React from "react";
import Card from "../components/Card";

function Favorites ({ items, onAddToFavorite }) {
    // console.log(items);
    return <section className="content p-40">
        <div className="d-flex justify-between align-center mb-40">
            <h1>your favorite items</h1>
        </div>

        <div className="cards d-flex flex-wrap">
            {
                items.map((item, index) => (
                    <Card
                        key={index.id}
                        id={item.id}
                        title={item.title}
                        price={item.price}
                        imgUrl={item.imgUrl}
                        favorited={true}
                        onFavoritePlus={onAddToFavorite}
                    />
                ))
            }
        </div>
    </section>
}
export default Favorites;

