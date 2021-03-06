import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from "react-router-dom";
import {Provider} from 'react-redux';
import {createStore, combineReducers, applyMiddleware,compose} from "redux";
import burgerBuilderReducer from "./store/reducers/burgerBuilder";
import thunk from "redux-thunk";
import orderReducer from "./store/reducers/order";
import authReducer from "./store/reducers/auth";
import createSagaMiddleware from 'redux-saga';
import {watchAuth} from "./store/sagas/rootSaga";

const rootReducers = combineReducers({
    burgerBuilder : burgerBuilderReducer,
    order: orderReducer,
    authReducer: authReducer
});
const sagaMiddleware  = createSagaMiddleware();

const composeEnhancers = process.env.NODE_ENV ==='development'? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__: null || compose;
const store = createStore(rootReducers,composeEnhancers(applyMiddleware(thunk, sagaMiddleware)));

sagaMiddleware.run(watchAuth);
const app = (
    <Provider store={store}>
    <BrowserRouter> <App/> </BrowserRouter>
    </Provider>
);
ReactDOM.render(
  <React.StrictMode>
      {app}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
