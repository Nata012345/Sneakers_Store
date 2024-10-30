import React from "react";

import Header from './components/Header';
import Card from "./components/Card";
import Drawer from "./components/Drawer";

function App() {
  return (
    <div className="wrapper clear">
        {/*<div style={{ display: 'none'}} className="overlay ">*/}
            <Drawer />
        {/*</div>*/}

        <Header />

        <section className="content p-40">
            <div className="d-flex justify-between align-center mb-40">
                <h1>All SNEAKERS</h1>
                <div className="searchBlock d-flex align-center">
                    <img width={14} height={14} src="/images/search.svg" alt="Search"/>
                    <input type="text" placeholder="Search..."/>
                </div>
            </div>

            <div className="cards d-flex">
                <Card />
                {/*<div className="card">*/}
                {/*    <div className="favorite">*/}
                {/*        <img src="/images/favorite.svg" alt="Unliked"/>*/}
                {/*    </div>*/}
                {/*    <img width={133} height={112} src="/images/sneakers/image%201.jpg" alt="Sneakers"/>*/}
                {/*    <h5>Nike Blazer Mid Suede</h5>*/}
                {/*    <div className="d-flex justify-between align-center">*/}
                {/*        <div className="d-flex flex-column ">*/}
                {/*            <span>Price: </span>*/}
                {/*            <b>213$</b>*/}
                {/*        </div>*/}
                {/*        <button className="button">*/}
                {/*            <img width={11} height={11} src="/images/plus.svg" alt="Plus"/>*/}
                {/*        </button>*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<div className="card">*/}
                {/*    <img width={133} height={112} src="/images/sneakers/image%202.jpg" alt="Sneakers"/>*/}
                {/*    <h5>Nike Blazer Mid Suede</h5>*/}
                {/*    <div className="d-flex justify-between align-center">*/}
                {/*        <div className="d-flex flex-column ">*/}
                {/*            <span className="text-uppercase">Price: </span>*/}
                {/*            <b>213$</b>*/}
                {/*        </div>*/}
                {/*        <button className="button">*/}
                {/*            <img width={11} height={11} src="/images/plus.svg" alt="Plus"/>*/}
                {/*        </button>*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<div className="card">*/}
                {/*    <img width={133} height={112} src="/images/sneakers/image%203.jpg" alt="Sneakers"/>*/}
                {/*    <h5>Nike Blazer Mid Suede</h5>*/}
                {/*    <div className="d-flex justify-between align-center">*/}
                {/*        <div className="d-flex flex-column ">*/}
                {/*            <span className="text-uppercase">Price: </span>*/}
                {/*            <b>213$</b>*/}
                {/*        </div>*/}
                {/*        <button className="button">*/}
                {/*            <img width={11} height={11} src="/images/plus.svg" alt="Plus"/>*/}
                {/*        </button>*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<div className="card">*/}
                {/*    <img width={133} height={112} src="/images/sneakers/image%204.jpg" alt="Sneakers"/>*/}
                {/*    <h5>Nike Blazer Mid Suede</h5>*/}
                {/*    <div className="d-flex justify-between align-center">*/}
                {/*        <div className="d-flex flex-column ">*/}
                {/*        <span className="text-uppercase">Price: </span>*/}
                {/*            <b>213$</b>*/}
                {/*        </div>*/}
                {/*        <button className="button">*/}
                {/*            <img width={11} height={11} src="/images/plus.svg" alt="Plus"/>*/}
                {/*        </button>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </section>
    </div>
  );
}

export default App;
