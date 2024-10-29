import React from "react";

function App() {
  return (
    <div className="wrapper clear">
        <header className="d-flex justify-between align-center p-40">
            <div  className="d-flex align-center">
                <img width={40} height={40} src="/images/logo.png" alt="logo" />
                <div>
                    <h3 className="text-uppercase o">sneakers</h3>
                    <p>Shop the best sneakers</p>
                </div>
            </div>
            <ul className="d-flex ">
                <li className="mr-30">
                    <img width={18} height={18} src="/images/cart.svg" alt="Cart" />
                    <span>30$</span>
                </li>
                <li>
                    <img width={18} height={18} src="/images/profile.svg" alt="Cart" />
                </li>
            </ul>
        </header>
        <section className="content p-40">
            <h1 className="mb-40">All SNEAKERS</h1>
            <div className="cards d-flex">
                <div className="card">
                    <img width={133} height={112} src="/images/sneakers/image%201.jpg" alt="Sneakers"/>
                    <h5>Nike Blazer Mid Suede</h5>
                    <div className="d-flex justify-between align-center">
                        <div className="d-flex flex-column ">
                            <span>Price: </span>
                            <b>213$</b>
                        </div>
                        <button className="button">
                            <img width={11} height={11} src="/images/plus.svg" alt="Plus"/>
                        </button>
                    </div>
                </div>
                <div className="card">
                    <img width={133} height={112} src="/images/sneakers/image%202.jpg" alt="Sneakers"/>
                    <h5>Nike Blazer Mid Suede</h5>
                    <div className="d-flex justify-between align-center">
                        <div className="d-flex flex-column ">
                            <span className="text-uppercase">Price: </span>
                            <b>213$</b>
                        </div>
                        <button className="button">
                            <img width={11} height={11} src="/images/plus.svg" alt="Plus"/>
                        </button>
                    </div>
                </div>
                <div className="card">
                    <img width={133} height={112} src="/images/sneakers/image%203.jpg" alt="Sneakers"/>
                    <h5>Nike Blazer Mid Suede</h5>
                    <div className="d-flex justify-between align-center">
                        <div className="d-flex flex-column ">
                            <span className="text-uppercase">Price: </span>
                            <b>213$</b>
                        </div>
                        <button className="button">
                            <img width={11} height={11} src="/images/plus.svg" alt="Plus"/>
                        </button>
                    </div>
                </div>
                <div className="card">
                    <img width={133} height={112} src="/images/sneakers/image%204.jpg" alt="Sneakers"/>
                    <h5>Nike Blazer Mid Suede</h5>
                    <div className="d-flex justify-between align-center">
                        <div className="d-flex flex-column ">
                            <span className="text-uppercase">Price: </span>
                            <b>213$</b>
                        </div>
                        <button className="button">
                            <img width={11} height={11} src="/images/plus.svg" alt="Plus"/>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    </div>
  );
}

export default App;
