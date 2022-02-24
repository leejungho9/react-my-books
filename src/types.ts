import { RouterState } from "connected-react-router";
import { AnyAction, Reducer } from "redux";

export type LoginReqType = {
    email : string;
    password : string;
}

export default interface AuthState {
    token : string | null;
    loading : boolean;
    error : Error | null;
}

export interface BookState {
    books : BookType[] | null ;
    loading : boolean;
    error : Error | null;
}

export interface RootState {
    auth : AuthState;
    books : BookState;
    router : Reducer<RouterState<unknown>,AnyAction>
}

export interface BookType {
    bookId : number;
    title : string;
    author : string;
    createdAt : string;
    url : string;
}