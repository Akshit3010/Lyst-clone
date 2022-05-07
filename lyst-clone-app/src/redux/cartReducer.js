import {
    
        GET_CARTDATA,

        DELETE_ITEM,
        GET_TOTAL,
        INCREMENT,
        DECREMENT,
        UPDATE_TOTAL,
      } from "./actionTypes";
      
      const initState = {
        isLoggedIn: false,
        isCouponUsed : false,
        cartData: [],
        totalAmount: 0,
        totalItem: 0,
      
      };
      
      const cartReducer = (state = initState, { type, payload }) => {
        switch (type) {
          case GET_CARTDATA:
            return {
              ...state,
              isLoggedIn: false,
              isError: false,
              cartData: payload,
            };
            case DELETE_ITEM:
                let newData = state.cartData.filter((curElem) => {
                    return curElem.id !== payload.id;
                 })
                 localStorage.setItem("cart",JSON.stringify(newData));
                return {
                 ...state,
                 cartData:newData ,
                };
    
              case GET_TOTAL :
                let { totalItem, totalAmount } = state.cartData.reduce(
                  (accum, curVal) => {
                    let { price, qty } = curVal;
            
                    let updatedTotalAmount = price * qty;
                    accum.totalAmount += updatedTotalAmount;
            
                    accum.totalItem += qty;
                    return accum;
                  },
                  {
                    totalItem: 0,
                    totalAmount: 0,
                  }
                );
               
                return { ...state, totalItem, totalAmount, isCouponUsed : false };
    
    
                case DECREMENT :
                  const updatedCart = state.cartData
          .map((curElem) => {
            if (curElem.id === payload.id) {
              return { ...curElem, qty: curElem.qty - 1 };
            }
            return curElem;
          })
          .filter((curElem) => curElem.qty !== 0);
        return { ...state, cartData: updatedCart };
    
    
              case INCREMENT :{
                const updatedCart = state.cartData.map((curElem) => {
                  if (curElem.id === payload.id) {
                    return { ...curElem, qty: curElem.qty + 1 };
                  }
                  return curElem;
                });
            
                return { ...state, cartData: updatedCart };
              }
              case UPDATE_TOTAL:
                let updatedTotal = 0;
                  updatedTotal += state.totalAmount -(state.totalAmount*30)/100;
                return {...state, totalAmount : updatedTotal, isCouponUsed : true };
    
          default:
            return state;
        }
      };
      export { cartReducer };