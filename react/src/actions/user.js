export const UPDATE_USER_FIELD = 'UPDATE_USER_FIELD';
export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const SAVE_USER_INFO = 'SAVE_USER_INFO';
export const CHECK_LOGGED = 'CHECK_LOGGED';
export const SAVE_TOKEN_AND_USER_INFOS = 'SAVE_TOKEN_AND_USER_INFOS';
export const GET_TOKEN = 'GET_TOKEN';
export const ADD_USER = 'ADD_USER';
export const REDIRECT_USER = 'REDIRECT_USER';
export const SAVE_GIFT = 'SAVE_GIFT';
export const DELETE_PROFIL = 'DELETE_PROFIL';
export const EDIT_PROFIL = 'EDIT_PROFIL';
export const DELETE_USER_FROM_STATE = 'DELETE_USER_FROM_STATE';
export const FETCH_USER_DETAILS = 'FETCH_USER_DETAILS';

export const updateUserField = (value, name) => ({
  type: UPDATE_USER_FIELD,
  value,
  name,
});

export const logIn = () => ({
  type: LOG_IN,
});

export const logOut = () => ({
  type: LOG_OUT,
});

export const addUser = () => ({
  type: ADD_USER,
});

export const saveUserInfosAfterRegister = (isLogged, name, firstname,
  age, email, password, profilPicture) => ({
  type: SAVE_USER_INFO,
  isLogged,
  name,
  firstname,
  age,
  email,
  password,
  profilPicture,
});

export const redirectUser = (slug) => ({
  type: REDIRECT_USER,
  slug,
});

export const checkLogged = () => ({
  type: CHECK_LOGGED,
});

export const saveTokenAndUserInfos = (firstname, lastname, slug, token, 
  avatar, birthday, email) => ({
  type: SAVE_TOKEN_AND_USER_INFOS,
  firstname,
  lastname,
  slug,
  token,
  avatar,
  birthday,
  email,
});

export const getToken = () => ({
  type: GET_TOKEN,
});

export const saveGift = () => ({
  type: SAVE_GIFT,
});

export const deleteProfil = () => ({
  type: DELETE_PROFIL,
});

export const deleteUserFromState = () => ({
  type: DELETE_USER_FROM_STATE,
});

export const editProfil = () => ({
  type: EDIT_PROFIL,
});

export const fetchUserDetails = () => ({

  type: FETCH_USER_DETAILS,

});

// TODO action addUser
