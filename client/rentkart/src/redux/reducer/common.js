import {  SET_PAGE_NUMBER, SET_SNACKBAR_DATA, SET_TOTAL_COUNT } from '../action';
import store from '../store.js';

export const initialState = {
  pageNumber: 1,
  totalCount: 0,
  snackBarData : {
  isOpen: false,
  message: '',
  severityType: 'info',
  }
};

export function updateSnackbarOpenState(isOpen) {
  return async() => {
    const snackbar = store.getState().commonStore.snackBarData;
    const updatedSnackbar = {...snackbar, isOpen}
    store.dispatch({type: SET_SNACKBAR_DATA, payload: updatedSnackbar})
  }
}

export function updateSnackbarMessage(message) {
  return async() => {
    const snackbar = store.getState().commonStore.snackBarData;
    const updatedSnackbar = {...snackbar, message}
    store.dispatch({type: SET_SNACKBAR_DATA, payload: updatedSnackbar})
  }
}

export function updateSnackbarSeverityType(severityType) {
  return async() => {
    const snackbar = store.getState().commonStore.snackBarData;
    const updatedSnackbar = {...snackbar, severityType}
    store.dispatch({type: SET_SNACKBAR_DATA, payload: updatedSnackbar})
  }
}


const commonReducer = (state= initialState, actions) => {
  switch(actions.type) {
    case SET_PAGE_NUMBER:
      return {
        ...state,
        pageNumber: actions.payload,
      };
    case SET_TOTAL_COUNT:
      return {
        ...state,
        totalCount: actions.payload,
      };
    case SET_SNACKBAR_DATA:
      return {
        ...state,
        snackBarData: actions.payload,
      }
    default : 
      return state;
  }
}

export default commonReducer;