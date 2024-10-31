import React, {useEffect, useState} from "react";

import Header from './components/Header';
import Card from "./components/Card";
import Drawer from "./components/Drawer";

function App() {
    const [ items, setItems] = useState([]);
    const [ cartItems, setCartItems ] = useState([]);
    const [ cartOpened, setCartOpened ] = useState(false);

    useEffect(() => {
        fetch('https://672285cc2108960b9cc4bc75.mockapi.io/items')
            .then((res) => { return res.json() })
            .then(json => setItems(json));
    }, []);

    const onAddToCart = (obj) => {
        setCartItems(prev => [...prev, obj]);
    }
    console.log(cartItems);
    return (
        <div className="wrapper clear">
            {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} />}
            <Header onClickCart={() => setCartOpened(true)} />

            <section className="content p-40">
                <div className="d-flex justify-between align-center mb-40">
                    <h1>All SNEAKERS</h1>
                    <div className="searchBlock d-flex align-center">
                        <img width={14} height={14} src="/images/search.svg" alt="Search"/>
                        <input type="text" placeholder="Search..."/>
                    </div>
                </div>

                <div className="cards d-flex flex-wrap">
                    { items.map((sneaker) => (
                        <Card
                            title={sneaker.title}
                            price={sneaker.price}
                            imgUrl={sneaker.imgUrl}
                            onFavoritPlus={() => console.log('Added to favorite')}
                            onCartPlus={(obj) => onAddToCart(obj)}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}

export default App;
