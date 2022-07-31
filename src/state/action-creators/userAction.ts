import { Dispatch } from 'react';
import { UserModel } from '../../models/UserModel';
import { ActionType } from '../action-types';
import { Action } from '../actions';

export const setUser = (user: UserModel) => {
  // localStorage.setItem('x-access-token', user.token);
  // localStorage.setItem('x-access-user', user.account_id);
  localStorage.setItem('user', JSON.stringify(user));
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_USER,
      payload: user,
    });
  };
};

export const deleteUsers = () => {
  // localStorage.removeItem('x-access-token');
  // localStorage.removeItem('x-access-user');

  localStorage.removeItem('user');
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.DELETE_USER,
    });
  };
};

export const handleLoader = (loading: boolean) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.USER_LOADER,
      payload: loading,
    });
  };
};
