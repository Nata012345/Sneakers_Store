import React, { useEffect, useState } from "react";
import { Route, Routes } from 'react-router-dom';
import {
    fetchSneakers, addSneakerToCart,
    fetchCartSneakers, removeItemFromCart,
    addSneakerToFavorite, getFavoritesSneakers,
    removeFromFavorites
} from "./firebase/firebaseService";

import Header from './components/Header';
import Drawer from "./components/Drawer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

function App() {
    const [items, setItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [cartOpened, setCartOpened] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const loadSneakers = async () => {
            console.log('loadSneakers')
            const loadItems = await fetchSneakers();
            console.log('loadSneakers items', loadItems)
            setItems(loadItems.map(item => ({
                ...item,
                isFavofite: false,
                isCart: false}))
            );
        };
        loadSneakers();
    }, []);

    const ifInCarts = (item, cartItems) => {
        for (let element of cartItems) {
            if(element.id === item.id) {
                return true
            }
        }
        return false
    }

    const loadFavoritesSneakers = async () => {
        const favoritesItems = await getFavoritesSneakers();
        setFavorites(favoritesItems);
        console.log('favoritesItems',favoritesItems)
    }

    useEffect(() => {
        const loadCartSneakers = async () => {
            console.log('loadCartSneakers')
            const cartItems = await fetchCartSneakers();
            setCartItems(cartItems);
            console.log('cartItems',cartItems)
            console.log('items',items)
            // setItems(items.map(item => ({
            //     ...item,
            //     inCart: ifInCarts(item, cartItems) // Устанавливаем inCart в true или false
            // })));
            console.log('setItems',items)
        }
        loadCartSneakers();
    }, []);
    useEffect(() => {
        loadFavoritesSneakers();
    }, []);

    const onAddToCart = async (obj) => {
        const existItem = cartItems.some(item => item.id === obj.id);
        if (!existItem) {
            const cartItem = await addSneakerToCart(obj);
            setCartItems(prev => [...prev, cartItem]);
            const newItems = items.map(item => {
                if (item.id === obj.id) {
                return obj
                } else {
                    return item
                }
            })
        setItems(newItems)
        }
    }
    const onRemoveItem = async (sneakerItem) => {
        try {
            // // const itemId = typeof id === "object" ? id.id : id;
            // if (typeof itemId !== "string") {
            //     throw new Error("ID should be a string");
            // }
            console.log('onRemoveItem sneakerItem:',sneakerItem)
            await removeItemFromCart(sneakerItem);
            setCartItems(prev => prev.filter(item => item.firestoreKey !== sneakerItem.firestoreKey));
            // console.log(`Item with ID ${id} removed successfully.`);
        } catch (err) {
            console.error("Error while removing item:", err);
        }
    }
    const onAddToFavorite = async (obj) => {
        console.log('obj: ',obj);
        console.log('favorites: ',favorites);
        try {
            const existingFavorite = favorites.find(favObj => favObj.id === obj.id);
            if (existingFavorite) {
                console.log('existingFavorite.firestoreKey: ',existingFavorite)
                await removeFromFavorites(existingFavorite);

                loadFavoritesSneakers();

                // setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
            } else {
                // const newFavorite = await addSneakerToFavorite(obj);
                // setFavorites((prev) => [...prev, newFavorite]);
                // console.log(favorites);

                const newSneaker = await addSneakerToFavorite(obj);
                setFavorites((prev) => [...prev, newSneaker])

                // const { data } = await axios.post("https://sneakers.free.beeceptor.com/favorites", obj);
            }
        } catch (err) {
            console.log('Failed to add to favorites')
        }
    }

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value)
    }
    return (
        <div className="wrapper clear">
            {cartOpened && <Drawer
                items={cartItems}
                onClose={() => setCartOpened(false)}
                onRemove={onRemoveItem}
            />}
            <Header onClickCart={() => setCartOpened(true)}/>

            <Routes>
                <Route path="/" element={
                    <Home
                        items={items}
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        onChangeSearchInput={onChangeSearchInput}
                        onAddToFavorite={onAddToFavorite}
                        onAddToCart={onAddToCart}
                        onRemoveItem={onRemoveItem}
                    />
                }/>
                <Route path="/favorites" element={
                    <Favorites
                        items={favorites}
                        onAddToFavorite={onAddToFavorite}
                    />
                }/>
            </Routes>
        </div>
    );
}

export default App;
