import Card from "../components/Card";
import React from "react";

function Home({
                  items,
                  favorites,
                  searchValue,
                  setSearchValue,
                  onChangeSearchInput,
                  onAddToFavorite,
                  onAddToCart,
                  onRemoveItem,
                  isLoading,
              }) {

    const isItemInFavorites = (obj) => {
        if (obj) {
            return favorites.some(favObj => Number(favObj.id) === Number(obj.id));
        } else {
            return false;
        }
    }
    const renderItems = () => {
        const filteredItems = items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()));
        return (isLoading ? [...Array(30)] : filteredItems).map((item, index) => (
            <Card
                key={index}
                {...item}
                isLoading={isLoading}
                onRemoveCartPlus={(obj) => onRemoveItem(obj)}
                onFavorite={onAddToFavorite}
                onCartPlus={(obj) => onAddToCart(obj)}
                isFavorite={isItemInFavorites(item)}
            />
        ))
    }
     return <section className="content p-40">
        <div className="d-flex justify-between align-center mb-40">
            <h1>All SNEAKERS</h1>
            <div className="searchBlock d-flex align-center">
                <img width={14} height={14} src="./images/search.svg" alt="Search"/>
                <input onChange={onChangeSearchInput} value={searchValue} placeholder="Search..."/>
                {searchValue &&
                    <img
                        onClick={() => setSearchValue('')}
                        className="clear cu-p"
                        src="./images/btn-remove.svg"
                        alt="Clear"/>}
            </div>
        </div>
        <div className="cards d-flex flex-wrap">
            {
                Array.isArray(items) && renderItems()
            }
        </div>
    </section>
}

export default Home;

