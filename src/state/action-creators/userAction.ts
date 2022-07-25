import { Dispatch } from 'react';
import { UserModel } from '../../models/UserModel';
import { ActionType } from '../action-types';
import { Action } from '../actions';

export const setUser = (user: UserModel) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_USER,
      payload: user,
    });
  };
};

export const deleteUsers = () => {
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
