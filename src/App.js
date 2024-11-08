import React, {useEffect, useState} from "react";
import {Route, Routes} from 'react-router-dom';
import { fetchSneakers, addSneakerToCart, fetchCartSneakers, removeItemFromCart, addSneakerToFavorite } from "./firebase/firebaseService";
import axios from "axios";

import Header from './components/Header';
import Drawer from "./components/Drawer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

function App() {
    const [ items, setItems] = useState([]);
    const [ cartItems, setCartItems ] = useState([]);
    const [ cartOpened, setCartOpened ] = useState(false);
    const [ searchValue, setSearchValue] = useState('');
    const [ favorites, setFavorites ] = useState([]);

    useEffect(() => {
        const loadSneakers = async () => {
            const items = await fetchSneakers();
            setItems(items);
        };
        loadSneakers();
        }, []);
    useEffect(() => {
        const loadCartSneakers = async () => {
            const cartItems = await fetchCartSneakers();
            setCartItems(cartItems);
        }
        loadCartSneakers();
    }, []);

    const onAddToCart = (obj) => {
        const existItem = cartItems.some(item => item.id === obj.id);
        if (!existItem) {
            addSneakerToCart(obj);
            setCartItems(prev => [...prev, obj]);
        }
    }
    console.log(cartItems);

    const onRemoveItem = async(id) => {
        try {
            const itemId = typeof  id === "object" ? id.id : id;
            console.log("Type of itemId:", typeof itemId);
            if (typeof itemId !== "string") {
                throw new Error("ID should be a string");
            }
            await removeItemFromCart(itemId);
            setCartItems(prev => prev.filter(item => item.id !== itemId));
            console.log(`Item with ID ${id} removed successfully.`);
        } catch (err) {
            console.error("Error while removing item:", err);
        }
    }

    const onAddToFavorite = async (obj) => {
        console.log("== onAddToFavorite",obj)
        try {
            // if (favorites.find(favObj => favObj.id === obj.id)) {
                // axios.delete(`https://sneakers.free.beeceptor.com/favorites/${obj.id}`)
                // setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
            // } else {
                await addSneakerToFavorite(obj);
                // const { data } = await axios.post("https://sneakers.free.beeceptor.com/favorites", obj);
                setFavorites((prev) => [...prev, obj]);
            // }
        } catch (err) {
            alert('Failed to add to favorites')
        }
    }

    const onChangeSearchInput = (event) =>{
        setSearchValue(event.target.value)
    }
    return (
        <div className="wrapper clear">
            {cartOpened && <Drawer
                items={cartItems}
                onClose={() => setCartOpened(false)}
                onRemove={onRemoveItem}
            />}
            <Header onClickCart={() => setCartOpened(true)} />

            <Routes>
                <Route path="/" element={
                    <Home
                        items={items}
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        onChangeSearchInput={onChangeSearchInput}
                        onAddToFavorite={onAddToFavorite}
                        onAddToCart={onAddToCart}
                    />
                } />
                <Route path="/favorites" element={
                    <Favorites
                        items={favorites}
                        // onAddToFavorite={onAddToFavorite}
                    />
                } />
            </Routes>
        </div>
    );
}

export default App;
