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

export const AppContext = React.createContext({});

function App() {
    const [items, setItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [cartOpened, setCartOpened] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadFavorites = async () => {
            setIsLoading(true)
            const favoritesItems = await getFavoritesSneakers();
            setFavorites(favoritesItems);
            setIsLoading(false)
            console.log('loadFavoritesSneakers', favoritesItems)
        }
        const loadCartSneakers = async () => {
            setIsLoading(true);
            const cartItems = await fetchCartSneakers();
            setCartItems(cartItems);
            setIsLoading(false);
            console.log('loadCartSneakers', cartItems)
        }
        const loadSneakers = async () => {
            setIsLoading(true);
            const loadItems = await fetchSneakers();
            console.log('loadSneakers items', loadItems)
            setItems(loadItems.map(item => ({
                ...item,
                isFavofite: false,
                isCart: false}))
            );
            setIsLoading(false)
        };
        loadFavorites();
        loadCartSneakers();
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

    // const loadFavoritesSneakers = async () => {
    //     const favoritesItems = await getFavoritesSneakers();
    //     setFavorites(favoritesItems);
    //     console.log('loadFavoritesSneakers', favoritesItems)
    // }

    // useEffect(() => {
    //     const loadCartSneakers = async () => {
    //         const cartItems = await fetchCartSneakers();
    //         setCartItems(cartItems);
    //         console.log('loadCartSneakers', cartItems)
    //     }
    //     loadCartSneakers();
    // }, []);
    // useEffect(() => {
    //     loadFavoritesSneakers();
    // }, []);

    const onAddToCart = async (obj) => {
        console.log("onAddToCart", obj);
        try {
            const existItem = cartItems.some(item => Number(item.id) === Number(obj.id));
            if (!existItem) {
                const cartItem = await addSneakerToCart(obj);
                setCartItems(prev => [...prev, cartItem]);
                // const newItems = items.map(item => {
                //     if (item.id === obj.id) {
                //         return obj
                //     } else {
                //         return item
                //     }
                // })
                // setItems(newItems)
            // } else {
            //     await removeItemFromCart(obj);
            //     setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
            //     console.log("cartItems after minus new sneaker", cartItems);
            }
        } catch (err) {
            console.error("Error adding to cart");
        }
        console.log("cartItems after plus new sneaker", cartItems);
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
        try {
            const existingFavorite = favorites.find(favObj => Number(favObj.id) === Number(obj.id));
            if (existingFavorite) {
                await removeFromFavorites(existingFavorite);
                setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)))
            } else {
                const newSneaker = await addSneakerToFavorite(obj);
                setFavorites((prev) => [...prev, newSneaker])
            }
        } catch (err) {
            console.log('Failed to add to favorites')
        }
    }
    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value)
    }

    const isItemAdded = (id) => {
        return cartItems.some((obj) => Number(obj.id) === Number(id));
    }

    return (
         <AppContext.Provider value={{ items, cartItems, favorites, isItemAdded, onAddToFavorite, setCartOpened, setCartItems }}>
            <div className="wrapper clear">
                {cartOpened && <Drawer
                    items={cartItems}
                    onClose={() => setCartOpened(false)}
                    onRemove={onRemoveItem}
                />}
                <Header onClickCart={() => setCartOpened(true)}/>
                <Routes>
                    <Route path="/" element = {
                        <Home
                            items={items}
                            searchValue={searchValue}
                            setSearchValue={setSearchValue}
                            cartItems={cartItems}
                            onChangeSearchInput={onChangeSearchInput}
                            onAddToFavorite={onAddToFavorite}
                            onAddToCart={onAddToCart}
                            onRemoveItem={onRemoveItem}
                            isLoading={isLoading}
                        />
                    }/>
                    <Route path="/favorites" element = {
                        <Favorites />
                    }/>
                </Routes>
            </div>
        </AppContext.Provider>
    );
}
export default App;
