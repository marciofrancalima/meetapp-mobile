import { Alert } from 'react-native';
import { all, call, takeLatest, put } from 'redux-saga/effects';

import api from '~/services/api';

import { updateProfileSuccess, updateProfileFailure } from './actions';

export function* updateProfile({ payload }) {
  try {
    const { name, email, ...rest } = payload.data;

    const profile = {
      name,
      email,
      ...(rest.oldPassword ? rest : {}),
    };

    const response = yield call(api.put, 'users', profile);

    Alert.alert(
      'Perfil atualizado',
      'Seus dados foram atualizados com sucesso'
    );

    yield put(updateProfileSuccess(response.data));
  } catch (error) {
    const message = String(error.response.data.message);
    Alert.alert('Erro ao atualizar', message);
  } finally {
    yield put(updateProfileFailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
