import { call, put, takeLatest } from 'redux-saga/effects';

const getUserName = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users/1');
  const result = await res.json();
  return result.name;
};

function* fetchUser(action: any) {
  try {
    const name: string = yield call(getUserName);
    yield put({ type: 'UPDATE_NAME_SUCCESS', payload: name });
  } catch (e:any) {
    yield put({ type: 'USER_FETCH_FAILED', message: e.message });
  }
}

export function* userSaga() {
  yield takeLatest('UPDATE_NAME', fetchUser);
}
