// === action types
export const FETCH_GIFTS = 'FETCH_GIFTS';
export const SAVE_GIFTS = 'SAVE_GIFTS';
export const SAVE_GIFT = 'SAVE_GIFT';
export const DELETE_GIFT = 'DELETE_GIFT';
export const DELETE_GIFT_FROM_STATE = 'DELETE_GIFT_FROM_STATE';
export const ADD_NEW_WISH = 'ADD_NEW_WISH';
export const LOG_OUT = 'LOG_OUT';
export const ADD_NEW_GIFT = 'ADD_NEW_GIFT';
export const CLEAR_STATE_GIFTS = 'CLEAR_STATE_GIFTS';
export const EDIT_GIFT = 'EDIT_GIFT';
export const UPDATE_GIFT_FIELD = 'UPDATE_GIFT_FIELD';
export const GET_GIFT_DETAILS_SLUG = 'GET_GIFT_DETAILS_SLUG';
export const FETCH_GIFT_DETAILS = 'FETCH_GIFT_DETAILS';
export const SAVE_GIFT_DETAILS = 'SAVE_GIFT_DETAILS';
export const HANDLE_CLICK_BOUGHT = 'HANDLE_CLICK_BOUGHT';
export const ADD_GIFT = 'ADD_GIFT';
export const FETCH_CURRENT_GIFT_INFOS = 'FETCH_CURRENT_GIFT_INFOS';
export const SAVE_CURRENT_GIFT_INFOS = 'SAVE_CURRENT_GIFT_INFOS';
export const HANDLE_CLICK_BOUGHT_LIST = 'HANDLE_CLICK_BOUGHT_LIST';
export const HANDLE_CLICK_STOP_BOUGHT_LIST = 'HANDLE_CLICK_STOP_BOUGHT_LIST';

// === action creators
export const fetchGifts = () => ({
  type: FETCH_GIFTS,
});
export const saveGifts = (giftList) => ({
  type: SAVE_GIFTS,
  giftList,
});
export const saveGift = (giftDetails) => ({
  type: SAVE_GIFT,
  giftDetails,
});
export const addNewWish = () => ({
  type: ADD_NEW_WISH,
});
export const addNewGift = () => ({
  type: ADD_NEW_GIFT,
});
export const addGift = (nomDeLaListe) => ({
  type: ADD_GIFT,
  nomDeLaListe,
});
export const clearStateGifts = () => ({
  type: CLEAR_STATE_GIFTS,
});

export const getGiftDetailsSlug = (nomDuGift, nomDeLaListe) => ({
  type: GET_GIFT_DETAILS_SLUG,
  nomDuGift,
  nomDeLaListe,
});
export const fetchGiftDetails = () => ({
  type: FETCH_GIFT_DETAILS,
});
export const saveGiftDetails = (giftDetails) => ({
  type: SAVE_GIFT_DETAILS,
  giftDetails,
});

export const fetchCurrentGiftInfos = (nomDuWish) => ({
  type: FETCH_CURRENT_GIFT_INFOS,
  nomDuWish,
});

export const handleClickBought = () => ({
  type: HANDLE_CLICK_BOUGHT,
});

export const logOut = () => ({
  type: LOG_OUT,
});
export const deleteGift = (slugDuGift) => ({
  type: DELETE_GIFT,
  slugDuGift,
});
export const deleteGiftFromState = (slugDuGift) => ({
  type: DELETE_GIFT_FROM_STATE,
  slugDuGift,
});

export const editGift = (slugDuGift, nomDeLaListe) => ({
  type: EDIT_GIFT,
  slugDuGift,
  nomDeLaListe,
});

export const updateGiftField = (value, name) => ({
  type: UPDATE_GIFT_FIELD,
  value,
  name,
});

export const saveCurrentGiftInfos = (name, details, link, picture, isHighlighted) => ({
  type: SAVE_CURRENT_GIFT_INFOS,
  name,
  details,
  link,
  picture,
  isHighlighted,
});

export const handleClickBoughtList = (giftSlug) => ({
  type: HANDLE_CLICK_BOUGHT_LIST,
  giftSlug,
});

export const handleClickStopBoughtList = (giftSlug) => ({
  type: HANDLE_CLICK_STOP_BOUGHT_LIST,
  giftSlug,
});
