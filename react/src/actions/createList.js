export const CHANGE_NAME = 'CHANGE_NAME';
export const CHANGE_EVENT_DATE = 'CHANGE_EVENT_DATE';
export const CHANGE_DESCRIPTION = 'CHANGE_DESCRIPTION';
export const CREATE_LIST = 'CREATE_LIST';
export const CLEAR_CREATE_LIST = 'CLEAR_CREATE_LIST';

export const changeName = (value) => ({
  type: CHANGE_NAME,
  value,
});
export const changeEventDate = (value) => ({
  type: CHANGE_EVENT_DATE,
  value,
});
export const changeDescription = (value) => ({
  type: CHANGE_DESCRIPTION,
  value,
});
export const createList = () => ({
  type: CREATE_LIST,
});
export const clearCreateList = () => ({
  type: CLEAR_CREATE_LIST,
});
