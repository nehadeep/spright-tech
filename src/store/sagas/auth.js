import {put} from 'redux-saga/effects';
import * as actions from "../actions/index";
import {delay} from 'redux-saga/effects';
import {logOut} from "../actions/index";
//sagas are related to actions
export function* logoutSaga(action) { //this is generator
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');
    yield put(actions.logoutSucceed());
}

export function* checkAuthTimoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logOut())

}