import React, {useEffect, useState} from "react";
import { AppContext } from "../App";

import Card from "../components/Card";
import { fetchUserOrders } from "../firebase/firebaseService";
import Nooders from "../components/Nooders";

function Orders () {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { onRemoveItem } = React.useContext(AppContext);
    useEffect(() => {
        async function fetchOrders() {
            try {
                const  userOrders  = await fetchUserOrders();
                const userProducts = userOrders.reduce((prev, obj) => [...prev, ...obj.products], []);
                console.log(userProducts);
                const uniqueProducts = Array.from(new Map(userProducts.map((product) => [product.id, product])).values());
                setOrders(uniqueProducts);
                setIsLoading(false);
            } catch (err) {
                console.log("Error of loading orders", err);
            }
        }
        fetchOrders();
    }, []);
    return <section className="content p-40">
        <div className="d-flex justify-between align-center mb-40">
            {
                (orders && orders.length > 0) ? <h1>My orders</h1> : ""
            }
        </div>
        <div className="cards d-flex flex-wrap">
            {
                (!(orders && orders.length > 0))
                    ?
                    (
                            <Nooders
                                title="You have no orders"
                                description={"You didn't create any orders"}
                                image={"./images/noOdersSmile.png"}
                            />
                        )
                    :
                    (isLoading ? [...Array(10)] : orders).map((item, index) => (
                        <Card key={index}
                              {...item}
                              isLoading={isLoading}
                        />
                    ))
            }
        </div>
    </section>
}
export default Orders;

