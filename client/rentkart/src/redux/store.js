import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk';
import reducer from './reducer';


let middlewares = [thunk];
const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middlewares)));

export default store;
