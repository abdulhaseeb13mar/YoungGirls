import ActionTypes from './BbActionTypes';

export const BbUserAction = (userinfo) => {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.USER_INFO,
      payload: userinfo,
    });
  };
};

export const BbsetCurrentProductAction = (productInfo) => {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.SET_CURRENT_PRODUCT,
      payload: productInfo,
    });
  };
};

export const BbsetFavAction = (favItem) => {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.SET_FAVOURITE,
      payload: favItem,
    });
  };
};

export const BbremoveFavAction = (itemId) => {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.REMOVE_FAVOURITE,
      payload: itemId,
    });
  };
};

export const BbaddCartAction = (item) => {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.ADD_ITEM_CART,
      payload: item,
    });
  };
};

export const BbremoveCartAction = (item) => {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.REMOVE_ITEM_CART,
      payload: item,
    });
  };
};

export const BbresetCart = () => {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.RESET_CART,
    });
  };
};
