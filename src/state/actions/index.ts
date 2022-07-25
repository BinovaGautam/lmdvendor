import { UserModel } from '../../models/UserModel';
import { ActionType } from '../action-types';

interface SetUserAction {
  type: ActionType.SET_USER;
  payload: UserModel;
}

interface DeleteUserAction {
  type: ActionType.DELETE_USER;
}

interface LoaderUserAction {
  type: ActionType.USER_LOADER;
  payload: boolean;
}

export type Action = SetUserAction | DeleteUserAction | LoaderUserAction;
