import { connectRouter, RouterState } from "connected-react-router";
import { AnyAction, combineReducers, Reducer } from "redux";
import { History } from 'history';
import books, { BookState } from './books';
import auth,{ AuthState } from './auth';

export interface RootState {
    books: BookState;
    auth: AuthState
    router: Reducer<RouterState<unknown>, AnyAction>;
  }
  
  const rootReducer = (history: History<unknown>) =>
    combineReducers({
      books,
      auth,
      router: connectRouter(history),
    });
  
  export default rootReducer;