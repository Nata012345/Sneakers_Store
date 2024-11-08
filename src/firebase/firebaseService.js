import  { collection, getDocs, addDoc, getFirestore, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

const fetchSneakers  = async () => {
    try {
        const sneakersCollection = collection(db, "items");
        const snapshot = await getDocs(sneakersCollection);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data()}));
    } catch (err) {
        console.error("Error getting Sneakers:", err);
    }
}

const fetchCartSneakers  = async () => {
    try {
        const cartCollection = collection(db, "cart");
        const snapshot = await getDocs(cartCollection);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data()}));
    } catch (err) {
        console.error("Error getting Sneakers:", err);
    }
}

const addSneakerToCart = async (sneaker) => {
    try {
        const cartCollection = collection(db, "cart");
        await addDoc(cartCollection, {
            id: sneaker.id,
            title: sneaker.title,
            price: sneaker.price,
            imgUrl: sneaker.imgUrl,
        });
        console.log("Sneaker added to cart", sneaker.id);
    } catch (err) {
        console.error("Error adding Sneaker to cart:", err);
    }
};

const removeItemFromCart = async (id) => {
    try {
        console.log("Type of ID:", typeof id);
        // const itemId = typeof  id === "object" ? id.id : id;
        // console.log("Type of itemId:", typeof itemId);
        if (typeof id !== "string") {
            throw new Error("itemId should be a string");
        }
        const sneakerItem = doc(db, "cart", id);
        await  deleteDoc(sneakerItem);
        console.log("removing succesully");
    } catch (err) {
        console.error("deletion did not occur:", err);
    }
}

const addSneakerToFavorite = async (sneaker) => {
    try {
        const cartCollection = collection(db, "favorites");
        await addDoc(cartCollection, {
            id: sneaker.id,
            title: sneaker.title,
            price: sneaker.price,
            imgUrl: sneaker.imgUrl,
        });
        console.log("Sneaker added to favorite", sneaker.id);
    } catch (err) {
        console.error("Error adding Sneaker to favorite:", err);
    }
};

export {
    fetchSneakers,
    addSneakerToCart,
    fetchCartSneakers,
    removeItemFromCart,
    addSneakerToFavorite,
}