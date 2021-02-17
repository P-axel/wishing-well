// === action types
export const FETCH_LISTS = 'FETCH_LISTS';
export const FETCH_OWN_LISTS = 'FETCH_OWN_LISTS';
export const SAVE_LISTS = 'SAVE_LISTS';
export const DELETE_LISTS = 'DELETE_LISTS';
export const SAVE_OWN_LISTS = 'SAVE_OWN_LISTS';
export const FETCH_FRIENDS_LISTS = 'FETCH_FRIENDS_LISTS';
export const SAVE_FRIENDS_LISTS = 'SAVE_FRIENDS_LISTS';
export const GET_SLUG = 'GET_SLUG';
export const SAVE_SLUG = 'SAVE_SLUG';
export const FETCH_LIST_INFOS = 'FETCH_LIST_INFOS';
export const SAVE_LIST_INFOS = 'SAVE_LIST_INFOS';
export const LOG_OUT = 'LOG_OUT';
export const HANDLE_CLICK_FOLLOW = 'HANDLE_CLICK_FOLLOW';
export const HANDLE_CLICK_UNFOLLOW = 'HANDLE_CLICK_UNFOLLOW';

// === action creators
export const fetchLists = () => ({
  type: FETCH_LISTS,
});

export const saveLists = (listsArray) => ({
  type: SAVE_LISTS,
  listsArray,
});

export const deleteList = (nomDeLaListe) => ({
  type: DELETE_LISTS,
  nomDeLaListe,
});

export const fetchOwnLists = () => ({
  type: FETCH_OWN_LISTS,
});

export const saveOwnLists = (listsArray) => ({
  type: SAVE_OWN_LISTS,
  listsArray,
});

export const fetchFriendsLists = () => ({
  type: FETCH_FRIENDS_LISTS,
});

export const saveFriendsLists = (listsArray) => ({
  type: SAVE_FRIENDS_LISTS,
  listsArray,
});

export const getSlug = () => ({
  type: GET_SLUG,
});

export const saveSlug = (slug) => ({
  type: SAVE_SLUG,
  slug,
});

export const fetchListInfos = () => ({
  type: FETCH_LIST_INFOS,
});

export const saveListInfos = (listInfos) => ({
  type: SAVE_LIST_INFOS,
  listInfos,
});

export const logOut = () => ({
  type: LOG_OUT,
});

export const handleClickFollow = () => ({
  type: HANDLE_CLICK_FOLLOW,
});

export const handleClickUnfollow = () => ({
  type: HANDLE_CLICK_UNFOLLOW,
});
