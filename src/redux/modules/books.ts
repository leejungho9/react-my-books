import { push } from "connected-react-router";
import { createActions, handleAction, handleActions } from "redux-actions";
import { call, put, select, takeEvery, takeLatest } from "redux-saga/effects";
import BookService from "../../serives/BookService";
import { BookState, BookType } from "../../types";


 const initialState : BookState = {
     books : null,
     loading : false,
     error : null
 }

 const prefix = "my-books/books";

 export const {pending, success, fail} = createActions("PENDING", "SUCCESS", "FAIL", {prefix});

 const  reducer = handleActions<BookState, BookType[]> ({
     PENDING : (state) => ({...state , loading: true, error : null}),
     SUCCESS : (state, action) => ({books : action.payload, loading : false , error : null}),
     FAIL : (state, action : any) => ({...state, loading : false , error : action.payload})
 }, initialState, {prefix})

 export default reducer;

 //saga 정의
 export const {getBooks} = createActions('GET_BOOKS', {prefix});
 
 function* getBookSaga() {
    try{
        yield put(pending());
        const token : string = yield select((state) => state.auth.token);
        const books :BookType[] = yield call(BookService.getBooks, token);
        yield put(success(books));
    }catch(error : any){
        yield put(fail(new Error(error?.response?.data?.error || 'UNKNOWN_ERROR')));

    }
 }
 export function* booksSaga() {
    yield takeLatest(`${prefix}/GET_BOOKS`, getBookSaga);
 }