import axios from "axios";
import { Type } from "lucide-react";
import React, { createContext, useContext, useEffect, useReducer } from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const initialState = [];

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CART":
      return action.payload;

    case "ADD":
      return action.payload;

    case "REMOVE":
      return action.payload;

    // case "UPDATE":
    //   return state.map((item) => {
    //     if (
    //       action.id === item.id &&
    //       item.size === action.size &&
    //       item.color === action.color
    //     ) {
    //       return {
    //         ...item,
    //         quantity: parseFloat(item.quantity) + parseFloat(action.quantity),
    //       };
    //     }
    //     return item;
    //   });

    case "DROP":
      return [];

    default:
      console.error("Error in Reducer", action.type);
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchCart = async () => {
      try{
        const res = await axios.get("/api/cart", {withCredentials : true});
        dispatch({type: "SET_CART", payload: res.data})
      }catch(err){
        console.error("Error in fetching cart: ", err);
      }
    };

    fetchCart();
  }, []);

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
