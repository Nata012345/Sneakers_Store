import React, { useEffect, useState } from "react";
import { Route, Routes } from 'react-router-dom';
import {
    fetchSneakers, addSneakerToCart,
    fetchCartSneakers, removeItemFromCart,
    addSneakerToFavorite, getFavoritesSneakers,
    removeFromFavorites
} from "./firebase/firebaseService";
import Header from './components/Header';
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";
import Drawer from "./components/Drawer";
const userId = "Natally"

export const AppContext = React.createContext({});

function App() {
    const [items, setItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [cartOpened, setCartOpened] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [favorites, setFavorites] = useState([]);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadFavorites = async () => {
            try {
                setIsLoading(true)
                const favoritesItems = await getFavoritesSneakers();
                setFavorites(favoritesItems);
                setIsLoading(false)
                console.log('loadFavoritesSneakers', favoritesItems)
            } catch (err) {
                console.error("Error of loading Favorites");
            }
        }
        const loadCartSneakers = async () => {
            try {
                setIsLoading(true);
                const cartItems = await fetchCartSneakers();
                setCartItems(cartItems);
                setIsLoading(false);
                console.log('loadcartItems', cartItems)
            } catch (err) {
                console.error("Error of loading Cart");
            }
        }
        const loadSneakers = async () => {
            try {
                setIsLoading(true);
                const loadItems = await fetchSneakers();
                console.log('loadSneakers items', loadItems)
                setItems(loadItems.map(item => ({
                    ...item,
                    isFavorite: false,
                    isCart: false}))
                );
                setIsLoading(false)
            } catch (err) {
                console.error("Error of loading Items");
            }
        };
        loadFavorites();
        loadCartSneakers();
        loadSneakers();
    }, []);
    // const ifInCarts = (item, cartItems) => {
    //     for (let element of cartItems) {
    //         if(element.id === item.id) {
    //             return true
    //         }
    //     }
    //     return false
    // }
    const onAddToCart = async (obj) => {
        try {
            const existItem = cartItems.find(item => Number(item.id) === Number(obj.id));
            if (!existItem) {
                const cartItem = await addSneakerToCart(obj);
                console.log("Added item to backcart", cartItem)
                setCartItems(prev => [...prev, cartItem]);
                // setCartItems(prev => [...prev, cartItem]);
                // const newItems = items.map(item => {
                //     if (item.id === obj.id) {
                //         return obj
                //     } else {
                //         return item
                //     }
                // })
                // setItems(newItems)
            } else {
                setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
                await removeItemFromCart(obj);
                console.log("cartItems after minus new sneaker", cartItems);
            }
        } catch (err) {
            console.error("Error adding to cart");
        }
    }
    const onRemoveItem = async (sneakerItem) => {
        try {
            // // const itemId = typeof id === "object" ? id.id : id;
            // if (typeof itemId !== "string") {
            //     throw new Error("ID should be a string");
            // }
            setCartItems(prev => prev.filter(item => item.firestoreKey !== sneakerItem.firestoreKey));
            await removeItemFromCart(sneakerItem);
        } catch (err) {
            console.error("Error while removing item:", err);
        }
    }
    const onAddToFavorite = async (obj) => {
        try {
            const existInFavorite = favorites.find(favObj => Number(favObj.id) === Number(obj.id));
            if (existInFavorite) {
                setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
                await removeFromFavorites(obj);
            } else {
                const newSneaker = await addSneakerToFavorite(obj);
                setFavorites((prev) => [...prev, newSneaker]);
            }
        } catch (err) {
            console.log('Failed to add to favorites');
        }
    }
    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value);
    }
    const isItemAdded = (id) => {
        return cartItems.some((obj) => Number(obj.id) === Number(id));
    }
    return (
         <AppContext.Provider value={{ userId, items, cartItems, favorites,
             isItemAdded, isFavorite, onAddToFavorite, setCartOpened, setCartItems }}>
            <div className="wrapper clear">
                <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} opened={cartOpened}/>
                <Header onClickCart={() => setCartOpened(true)}/>
                <Routes>
                    <Route path="/" element = {
                        <Home
                            items={items}
                            favorites={favorites}
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
                        <Favorites
                            onAddToCart={onAddToCart}
                            onRemoveItem={onRemoveItem}
                            isLoading={isLoading}
                        />
                    }/>
                    <Route path="/orders" element = {
                        <Orders />
                    }/>
                </Routes>
            </div>
        </AppContext.Provider>
    );
}
export default App;
