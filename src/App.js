import React from "react";

import Header from './components/Header';
import Card from "./components/Card";
import Drawer from "./components/Drawer";

const sneakers = [
    { title: "Nike Blazer Mid Suede", imgUrl: "/images/sneakers/image 1.jpg", price: 111 },
    { title: "Nike Air Max 270", imgUrl: "/images/sneakers/image 2.jpg", price: 222 },
    { title: "Nike Blazer Mid Suede", imgUrl: "/images/sneakers/image 3.jpg", price: 333 },
    { title: "Puma X Aka Boku Future Rider", imgUrl: "/images/sneakers/image 4.jpg", price: 444 },
    { title: "Under Armour Curry 8", imgUrl: "/images/sneakers/image 5.jpg", price: 555 },
    { title: "Nike Kyrie 7", imgUrl: "/images/sneakers/image 6.jpg", price: 666 },
    { title: "Jordan Air Jordan 11", imgUrl: "/images/sneakers/image 7.jpg", price: 777 },
    { title: "Nike LeBron XVIII", imgUrl: "/images/sneakers/image 8.jpg", price: 888 },
]

function App() {
  return (
    <div className="wrapper clear">
        <Drawer />
        <Header />

        <section className="content p-40">
            <div className="d-flex justify-between align-center mb-40">
                <h1>All SNEAKERS</h1>
                <div className="searchBlock d-flex align-center">
                    <img width={14} height={14} src="/images/search.svg" alt="Search"/>
                    <input type="text" placeholder="Search..."/>
                </div>
            </div>

            <div className="cards d-flex flex-wrap">
                { sneakers.map((sneaker) => (
                    <Card
                        title={sneaker.title}
                        price={sneaker.price}
                        imgUrl={sneaker.imgUrl}
                        onClicl={() => console.log(sneaker)}
                    />
                ))}
            </div>
        </section>
    </div>
  );
}

export default App;
