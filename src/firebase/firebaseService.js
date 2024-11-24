import { collection, getDocs, getDoc, addDoc, getFirestore, deleteDoc, doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "./firebase";

const fetchSneakers = async () => {
    try {
        const sneakersCollection = collection(db, "items");
        const snapshot = await getDocs(sneakersCollection);
        return snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
    } catch (err) {
        console.error("Error getting Sneakers:", err);
    }
}
const fetchCartSneakers = async () => {
    try {
        const cartCollection = collection(db, "cart");
        const snapshot = await getDocs(cartCollection);
        return snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
    } catch (err) {
        console.error("Error getting Sneakers:", err);
    }
}
const fetchUserOrders = async () => {
    try {
        const ordersCollection = collection(db, "orders");
        const snapshot = await getDocs(ordersCollection);
        return snapshot.docs.map(doc => ({
            // id: doc.id,
            ...doc.data()}));
    } catch (err) {
        console.error("Error getting Orders:", err);
    }
}

const addSneakerToCart = async (sneaker) => {
    try {
        console.log("sneaker that going to added the cart", sneaker)
        const cartCollection = collection(db, "cart");
        const docRef = await addDoc(cartCollection, {
            id: sneaker.id,
            title: sneaker.title,
            price: sneaker.price,
            imgUrl: sneaker.imgUrl,
        });
        return {...sneaker, firestoreKey: docRef._key.path.lastSegment()}
    } catch (err) {
        console.error("Error adding Sneaker to backcart:", err);
    }
    console.log("Sneaker is added to backcart", sneaker)
};
const removeItemFromCart = async (sneaker) => {
    try {
        const itemsCollection = collection(db, "cart");
        const snapshot = await getDocs(itemsCollection);
        const cartItems = snapshot.docs.map(doc => ({
            firestoreKey: doc._key.path.lastSegment(), ...doc.data()
        }))
        const item = cartItems.find((el) => Number(el.id) === Number(sneaker.id))
        if (item) {
            const cartItem = doc(db, "cart", item.firestoreKey);
            await  deleteDoc(cartItem);
            console.log("Snaker is removed from backCart", cartItem);
        } else {
            console.log("Could not find the sneaker in cart", sneaker);
        }
    } catch (err) {
        console.error("Error removing Sneaker from backfavorites:", err);
    }
}
const removeCart = async () => {
    try {
        const collectionRef = collection(db, "cart");
        const snapshot = await getDocs(collectionRef);
        const deletePromises = snapshot.docs.map((docSnap) => {
            deleteDoc(doc(db, "cart", docSnap.id))
        });
        await Promise.all(deletePromises);
        console.log("Cart is successfully deleted from the back!");
    } catch (err) {
        console.error("Error removing Cart from the back:", err);
    }
}
const getFavoritesSneakers = async (sneakers) => {
    try {
        const sneakersCollection = collection(db, "favorites");
        const snapshot = await getDocs(sneakersCollection);
        return snapshot.docs.map(doc =>
            ({firestoreKey: doc._key.path.lastSegment(), ...doc.data()})
        );
    } catch (err) {
        console.error("Error loading favorite sneakers", err);
    }
}
const addSneakerToFavorite = async (sneaker) => {
    try {
        const favoritesCollection = collection(db, "favorites");
        const docRef = await addDoc(favoritesCollection, {
            id: sneaker.id,
            title: sneaker.title,
            price: sneaker.price,
            imgUrl: sneaker.imgUrl,
        });
        console.log("Sneaker is added to backfavorite", docRef);
        return {...sneaker, firestoreKey: docRef._key.path.lastSegment()};
    } catch (err) {
        console.error("Error adding Sneaker to backfavorite:", err);
    }
};
const removeFromFavorites = async (sneaker) => {
    try {
        // --- getting all actual favoriteItems
        const sneakersCollection = collection(db, "favorites");
        const snapshot = await getDocs(sneakersCollection);
        const favorites = snapshot.docs.map(doc =>
            ({firestoreKey: doc._key.path.lastSegment(), ...doc.data()})
        );
        //--- getting item from favorites by id
        const item = favorites.find((el) => Number(el.id) === Number(sneaker.id));
        if (item) {
            const sneakerItem = doc(db, "favorites", item.firestoreKey);
            await deleteDoc(sneakerItem);
            console.log("Sneaker is removed from backfavorite", sneakerItem);
        } else {
            console.log("Could not find the sneaker in favorites", sneaker);
        }
    } catch (err) {
        console.error("Error removing Sneaker from backfavorites:", err);
    }
}

const getOrderId = async () => {
    console.log("1")
    try {
        const docRef = doc(db, "orderCounter", "counterDoc");
        const docSnap = await getDoc(docRef);
        let orderId = 1;
        if (docSnap.exists()) {
            const data = docSnap.data();
            orderId = Number(data.lastOrder || 0) + 1;
        }
        await  updateDoc(docRef, {
            lastOrder: orderId
        });
        return orderId;
    } catch (err) {
        console.error("Error loading getOrderId", err);
    }
}
const addOder = async ({ cartItems, userId }) => {
    try {
        const  orderCollection = collection(db, "orders");
        const docRef = doc(orderCollection);
        const orderId =  await getOrderId();
        const orderObject = {
            orderId: orderId,
            userId: userId,
            products: cartItems,
        }
       await  setDoc(docRef, orderObject);
        console.log("Order is added to backOrder", orderObject);
        return { orderObject: orderObject };
        // TODO: вернуть id заказа через return
    } catch (err) {
        console.error("Error adding the orderBack:", err);
    }
};

export {
    fetchSneakers,
    addSneakerToCart,
    fetchCartSneakers,
    fetchUserOrders,
    removeItemFromCart,
    removeCart,
    addSneakerToFavorite,
    getFavoritesSneakers,
    removeFromFavorites,
    addOder,
}