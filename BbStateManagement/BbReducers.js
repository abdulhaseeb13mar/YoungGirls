import ActionTypes from './BbActionTypes';
import {combineReducers} from 'redux';

const userState = {};
let crntPrdtState = {};
let FavItems = [];
let cart = {
  items: {},
  totalItems: 0,
  totalAmount: 0,
};

const BbCartReducer = (st = cart, action) => {
  let prev_items = {...st.items};
  switch (action.type) {
    case ActionTypes.ADD_ITEM_CART:
      if (!prev_items[action.payload.id]) {
        prev_items[action.payload.id] = {...action.payload, added: 0};
      }
      let added1 = prev_items[action.payload.id].added + 1;
      prev_items[action.payload.id].added = added1;
      let tot_items = st.totalItems + 1;
      let tot_amount = (
        parseFloat(st.totalAmount) + parseFloat(action.payload.price)
      ).toFixed(2);
      st = Object.assign({}, st, {
        items: prev_items,
        totalItems: tot_items,
        totalAmount: tot_amount,
      });
      return st;

    case ActionTypes.REMOVE_ITEM_CART:
      const id = action.payload.id;
      const itemAdded = prev_items[id].added;
      if (itemAdded === 1) {
        delete prev_items[id];
      } else {
        prev_items[action.payload.id].added = itemAdded - 1;
      }
      tot_items = st.totalItems - 1;
      tot_amount = (
        parseFloat(st.totalAmount) - parseFloat(action.payload.price)
      ).toFixed(2);
      st = Object.assign({}, st, {
        items: prev_items,
        totalItems: tot_items,
        totalAmount: tot_amount,
      });
      return st;

    case ActionTypes.RESET_CART:
      let resetCart = {
        items: {},
        totalItems: 0,
        totalAmount: 0,
      };
      return resetCart;

    default:
      break;
  }
  return st;
};

const BbUserReducer = (st = userState, action) => {
  switch (action.type) {
    case ActionTypes.USER_INFO:
      st = Object.assign({}, st, {...action.payload});
      return st;

    default:
      break;
  }
  return st;
};

const BbCrntPrdtReducer = (state = crntPrdtState, action) => {
  switch (action.type) {
    case ActionTypes.SET_CURRENT_PRODUCT:
      state = Object.assign({}, state, {...action.payload});
      return state;

    default:
      break;
  }
  return state;
};

const BbToggleFav = (state = FavItems, action) => {
  switch (action.type) {
    case ActionTypes.SET_FAVOURITE:
      let isUnique = true;
      let arr = [...state];
      for (let i = 0; i < state.length; i++) {
        if (state[i].id === action.payload.id) {
          isUnique = false;
          break;
        }
      }
      isUnique && arr.push({...action.payload});
      return arr;

    case ActionTypes.REMOVE_FAVOURITE:
      arr = state.filter((item) => item.id !== action.payload);
      return arr;

    default:
      break;
  }
  return state;
};

export default combineReducers({
  BbCartReducer,
  BbToggleFav,
  BbCrntPrdtReducer,
  BbUserReducer,
});
