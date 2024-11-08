import Card from "../components/Card";
import React from "react";

function Home({ items,
                  searchValue,
                  setSearchValue,
                  onChangeSearchInput,
                  onAddToFavorite,
                  onAddToCart
}) {
    return <section className="content p-40">
        <div className="d-flex justify-between align-center mb-40">
            <h1>All SNEAKERS</h1>
            <div className="searchBlock d-flex align-center">
                <img width={14} height={14} src="/images/search.svg" alt="Search" />
                <input onChange={onChangeSearchInput} value={searchValue} placeholder="Search..." />
                {searchValue &&
                    <img
                        onClick={() => setSearchValue('')}
                        className="clear cu-p"
                        src="/images/btn-remove.svg"
                        alt="Clear" />}
            </div>
        </div>

        <div className="cards d-flex flex-wrap">
            {Array.isArray(items) && items
                .filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
                .map((item) => (
                    <Card
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        price={item.price}
                        imgUrl={item.imgUrl}
                        onFavoritePlus={onAddToFavorite}
                        onCartPlus={(obj) => onAddToCart(obj)}
                    />
                ))}
        </div>
    </section>
}
export default Home;

