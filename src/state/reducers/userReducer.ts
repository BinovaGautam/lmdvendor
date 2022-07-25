import { UserModel, UserStateModel } from '../../models/UserModel';
import { ActionType } from '../action-types';
import { Action } from '../actions';

const token: string | null = localStorage.getItem('x-access-token');
const account_id: string | null = localStorage.getItem('x-access-user');

const user: UserModel | null = token && account_id ? { token, account_id } : null;

const initialState: UserStateModel = {
  user: user,
  loading: false,
};

const reducer = (state: UserStateModel = initialState, action: Action): UserStateModel => {
  switch (action.type) {
    case ActionType.SET_USER:
      return { ...state, user: action.payload, loading: false };
    case ActionType.DELETE_USER:
      return { ...state, user: null, loading: false };
    case ActionType.USER_LOADER:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export default reducer;
