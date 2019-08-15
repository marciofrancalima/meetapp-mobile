import { Alert } from 'react-native';
import { takeLatest, all, call, put } from 'redux-saga/effects';

import api from '~/services/api';

import { signInSuccess, signUpSuccess, signInFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    api.defaults.headers.authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));
  } catch (error) {
    const message = String(error.response.data.message);
    Alert.alert('Erro ao logar', message);
  } finally {
    yield put(signInFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;

    yield call(api.post, 'users', {
      name,
      email,
      password,
    });

    yield put(signUpSuccess());
  } catch (error) {
    const message = String(error.response.data.message);
    Alert.alert('Erro ao tentar cadastrar', message);
  } finally {
    yield put(signInFailure());
  }
}

function setToken({ payload }) {
  if (!payload) {
    return;
  }

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
]);
