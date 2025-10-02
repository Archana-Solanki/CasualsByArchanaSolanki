import axios from "axios"
import { useCart, useDispatchCart } from "../Components/ContextReducer"
const apiUrl = import.meta.env.VITE_API_URL;

export const useCartActions = () => {
    const cart = useCart();
    const dispatch = useDispatchCart();

    const fetchCart = async () => {
        const res = await axios.get(`${apiUrl}/cart`, { withCredentials: true });
        dispatch({ type: "SET_CART", payload: res.data });
    };

    const addToCart = async (item) => {
        try {
            const res = await axios.post(`${apiUrl}/cart/addToCart`, item, { withCredentials: true });
            dispatch({ type: "ADD", payload: res.data });
        } catch (err) {
            console.log(err);
        }
    }

    const updateCartItem = async (productID, productQuantity, productColor, productSize) => {
        const res = await axios.put(
            `${apiUrl}/cart/updateCart`,
            { productID, productQuantity, productColor, productSize },
            { withCredentials: true }
        );
        dispatch({ type: "SET_CART", payload: res.data });
    };

    const removeFromCart = async (productID, productSize, productColor) => {
        try {
            const res = await axios.delete(`${apiUrl}/cart/deleteItemFromCart`, { data: {productID, productColor, productSize}, withCredentials: true });
            dispatch({ type: "REMOVE", payload: res.data });
        } catch (err) {
            console.error(err);
        }
    };

    const clearCart = async () => {
        try {
            await axios.delete(`${apiUrl}/cart/all`, { withCredentials: true });
            dispatch({ type: "DROP" });
        } catch (err) {
            console.error(err);
        }
    };

    return {fetchCart, addToCart, updateCartItem, removeFromCart, clearCart };
}