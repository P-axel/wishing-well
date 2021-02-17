// === action types
export const GET_SLUG = 'GET_SLUG';
export const FETCH_LIST = 'FETCH_LIST';
export const SAVE_LIST = 'SAVE_LIST';
export const CHANGE_NAME_EDIT_LIST = 'CHANGE_NAME_EDIT_LIST';
export const CHANGE_EVENT_DATE_EDIT_LIST = 'CHANGE_EVENT_DATE_EDIT_LIST';
export const CHANGE_DESCRIPTION_EDIT_LIST = 'CHANGE_DESCRIPTION_EDIT_LIST';
export const EDIT_LIST = 'EDIT_LIST';
export const CLEAR_EDIT_LIST = 'CLEAR_EDIT_LIST';

// === action creators
export const getSlug = (slug) => ({
  type: GET_SLUG,
  slug,
});
export const fetchList = () => ({
  type: FETCH_LIST,
});
export const saveList = (list) => ({
  type: SAVE_LIST,
  list,
});
export const changeNameEditList = (value) => ({
  type: CHANGE_NAME_EDIT_LIST,
  value,
});
export const changeEventDateEditList = (value) => ({
  type: CHANGE_EVENT_DATE_EDIT_LIST,
  value,
});
export const changeDescriptionEditList = (value) => ({
  type: CHANGE_DESCRIPTION_EDIT_LIST,
  value,
});
export const editList = () => ({
  type: EDIT_LIST,
});
export const clearEditList = () => ({
  type: CLEAR_EDIT_LIST,
});
