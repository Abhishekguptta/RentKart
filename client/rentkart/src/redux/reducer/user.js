import { SET_LOGIN_MODAL_OPEN, SET_USERS_LIST, SET_USER_DATA } from '../action';

export const initialState = {
  userData: {},
  userList: [],
  isLoginModalOpen: false,
};

const userReducer = (state= initialState, actions) => {
  switch(actions.type) {
    case SET_USER_DATA: 
      return {
        ...state,
        userData: actions.payload,
      };
    case SET_USERS_LIST:
      return {
        ...state,
        userList: actions.payload,
      };
    case SET_LOGIN_MODAL_OPEN:
      return {
        ...state,
        isLoginModalOpen: actions.payload,
      }
    default : 
      return state;
  }
}

export default userReducer;