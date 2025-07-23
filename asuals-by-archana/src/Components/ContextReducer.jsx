import React, { createContext, useContext, useEffect, useReducer } from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const initialState = () => {
  try {
    const localData = localStorage.getItem("cartData");
    const parsed = JSON.parse(localData);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    // If parsing fails or data is invalid, return an empty array
    return [];  
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          price: action.price,
          quantity: action.quantity,
          img: action.img,
          mrp: action.mrp,
          size: action.size,
          color: action.color, // <-- store color
          availableSizes: action.availableSizes || [],
          availableColors: action.availableColors || [],
          returnPolicy: action.exchangePolicy
            ? "Exchange available within 7 days"
            : "No returns or exchanges",
          deliveryExpectation: "Delivery in 3-5 business days",
        },
      ];

    // case "REMOVE":
    //   let newArr = [...state];
    //   newArr.splice(action.index, 1);
    //   return newArr;

    case "REMOVE":
  return state.filter(
    (item) =>
      !(
        item.id === action.id &&
        item.size === action.size &&
        item.color === action.color
      )
  );


    case "UPDATE":
      // If action.newSize or action.newColor is present, update accordingly
      if (action.newSize || action.newColor) {
        // Find the item to update
        const currentIdx = state.findIndex(
          (item) =>
            item.id === action.id &&
            item.size === action.size &&
            item.color === action.color
        );
        // Find if another item with new size/color exists
        const existingIdx = state.findIndex(
          (item) =>
            item.id === action.id &&
            item.size === (action.newSize || action.size) &&
            item.color === (action.newColor || action.color)
        );
        if (
          existingIdx !== -1 &&
          currentIdx !== -1 &&
          existingIdx !== currentIdx
        ) {
          // Merge quantities and remove the old item
          const merged = [...state];
          merged[existingIdx] = {
            ...merged[existingIdx],
            quantity:
              parseFloat(merged[existingIdx].quantity) +
              parseFloat(state[currentIdx].quantity),
          };
          merged.splice(currentIdx, 1);
          return merged;
        }
        // Just update size/color
        return state.map((item) => {
          if (
            action.id === item.id &&
            action.size === item.size &&
            action.color === item.color
          ) {
            return {
              ...item,
              size: action.newSize || item.size,
              color: action.newColor || item.color,
            };
          }
          return item;
        });
      }
      // Otherwise, update quantity as before
      return state.map((item) => {
        if (
          action.id === item.id &&
          item.size === action.size &&
          item.color === action.color
        ) {
          return {
            ...item,
            quantity: parseFloat(item.quantity) + parseFloat(action.quantity),
          };
        }
        return item;
      });

    case "DROP":
      localStorage.removeItem("cartData"); 
      return [];

    default:
      console.log("Error in Reducer");
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, [], initialState);

  useEffect(() => {
    localStorage.setItem("cartData", JSON.stringify(state));
  }, [state]);

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
