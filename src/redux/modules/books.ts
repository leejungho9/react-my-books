import { push } from "connected-react-router";
import { AnyAction } from "redux";
import { Action, createActions, handleActions } from "redux-actions";
import { call, put, select, takeLatest } from "redux-saga/effects";
import BookService from "../../serives/BookService";
import { BookReqType, BookResType } from "../../types";


export interface BookState {
    books: BookResType[] | null;
    loading: boolean;
    error: Error | null;
  }

  
 const initialState : BookState = {
     books : null,
     loading : false,
     error : null
 }

 const prefix = "my-books/books";

 export const {pending, success, fail} = createActions("PENDING", "SUCCESS", "FAIL", {prefix});

 const  reducer = handleActions<BookState, any> ({
     PENDING : (state) => ({...state , loading: true, error : null}),
     SUCCESS : (state, action) => ({books : action.payload, loading : false , error : null}),
     FAIL : (state, action : any) => ({...state, loading : false , error : action.payload})
 }, initialState, {prefix})

 export default reducer;

 export const { addBook, editBook, deleteBook, getBooks } = createActions(
    {
      ADD_BOOK: (book: BookReqType) => ({
        book,
      }),
      EDIT_BOOK: (bookId: number, book: BookReqType) => ({
        bookId,
        book,
      }),
      DELETE_BOOK: (bookId: string) => ({ bookId }),
    },
    'GET_BOOKS',
    {prefix},
  );
  
 /////////////////////////////////SAGA 정의
 
 function* getBookSaga() {
    try{
        yield put(pending());
        const token : string = yield select((state) => state.auth.token);
        const books :BookResType[] = yield call(BookService.getBooks, token);
        yield put(success(books));
    }catch(error : any){
        yield put(fail(new Error(error?.response?.data?.error || 'UNKNOWN_ERROR')));

    }
 }

 interface AddBookSagaAction extends AnyAction {
    payload: {
      book: BookReqType;
    };
  }

 function* addBookSaga(action : AddBookSagaAction ) {
     try{
        yield put(pending());
        const token : string = yield select(state => state.auth.token);
        const book: BookResType = yield call(BookService.addBook, token, action.payload.book);
        const books : BookResType[] = yield select(state => state.books.books);
        yield put(success([...books, book]));
        yield put(push('/'));
     }catch(error : any){
        yield put(fail(new Error(error?.response?.data?.error || 'UNKNOWN_ERROR')));
     }
 }
 interface DeleteBookSagaAction extends AnyAction {
    payload: {
      bookId: number;
    };
  }
  
    function* deleteBookSaga(action: DeleteBookSagaAction ){
        try{
            const {bookId} = action.payload;
            yield put(pending());
            const token:string = yield select(state => state.auth.token);
            yield call(BookService.deleteBook, token, bookId);
            const books:BookResType[] = yield select(state=>state.books.books)
            yield put(success(books.filter(book => book.bookId !== bookId)));

        } catch (error:any) {
            yield put(fail(new Error(error?.response?.data.error || 'UNKNOWN_ERROR')));
        }
    }
    interface EditBookSagaAction extends AnyAction {
        payload : {
            bookId : number;
            book : BookReqType;
        }
    }
    function* editBookSaga(action : EditBookSagaAction){
        try{
            yield put(pending());
            const token : string = yield select(state => state.auth.token);
            const newBook:BookResType = yield call(BookService.editBook, token, 
                action.payload.bookId, action.payload.book);
            const books : BookResType[] = yield select(state=> state.books.books);
            yield put(success(
                books.map((book)=> (book.bookId === newBook.bookId?  newBook : book)),
            ),
            );
            yield put(push('/'));
        }catch(error :any) {
            yield put(fail(new Error(error?.response?.data?.error || 'UNKNOWN_ERROR')));
        }
    }

 export function* booksSaga() {
    yield takeLatest(`${prefix}/GET_BOOKS`, getBookSaga);
    yield takeLatest(`${prefix}/ADD_BOOK`, addBookSaga);
    yield takeLatest(`${prefix}/DELETE_BOOK`, deleteBookSaga);
    yield takeLatest(`${prefix}/EDIT_BOOK`, editBookSaga);
 }