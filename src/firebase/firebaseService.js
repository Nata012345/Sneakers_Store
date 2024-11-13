import {collection, getDocs, addDoc, getFirestore, deleteDoc, doc} from "firebase/firestore";
import {db} from "./firebase";

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

const addSneakerToCart = async (sneaker) => {
    try {
        const cartCollection = collection(db, "cart");
        const docRef = await addDoc(cartCollection, {
            id: sneaker.id,
            title: sneaker.title,
            price: sneaker.price,
            imgUrl: sneaker.imgUrl,
        });
        console.log("Sneaker added to cart", docRef);
        return {...sneaker, firestoreKey: docRef._key.path.lastSegment()}
    } catch (err) {
        console.error("Error adding Sneaker to cart:", err);
    }
};

const removeItemFromCart = async (sneakerItemIn) => {
    console.log(sneakerItemIn);
    try {
        const sneakerItem = doc(db, "cart", sneakerItemIn.firestoreKey);
        await deleteDoc(sneakerItem);
        console.log("removing succesully:", sneakerItem);
    } catch (err) {
        console.error("Error removing Sneaker from favorites:", err);
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
        console.log("Sneaker added to favorite", docRef);
        return {...sneaker, firestoreKey: docRef._key.path.lastSegment()};
    } catch (err) {
        console.error("Error adding Sneaker to favorite:", err);
    }
};
const removeFromFavorites = async (sneaker) => {
    try {
        const sneakerItem = doc(db, "favorites", sneaker.firestoreKey);
        await deleteDoc(sneakerItem);
        console.log("removing succesully:", sneakerItem);
    } catch (err) {
        console.error("Error removing Sneaker from favorites:", err);
    }
}

export {
    fetchSneakers,
    addSneakerToCart,
    fetchCartSneakers,
    removeItemFromCart,
    addSneakerToFavorite,
    getFavoritesSneakers,
    removeFromFavorites,
}