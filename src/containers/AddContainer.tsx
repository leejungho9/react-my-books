import { goBack } from "connected-react-router";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Add from "../components/Add";
import { BookReqType, BookResType } from "../types";
import {logout as logoutSagaStart} from '../redux/modules/auth';
import {addBook as addBookSagaStart} from '../redux/modules/books';
import { RootState } from "../redux/modules/rootReducer";
import {
    getBooks as getBooksSaga,
  } from '../redux/modules/books';

const AddContainer = () => {
    const books = useSelector<RootState, BookResType[] | null>(
      (state) => state.books.books,
    );
    const loading = useSelector<RootState, boolean>(
      (state) => state.books.loading,
    );
    const error = useSelector<RootState, Error | null>(
      (state) => state.books.error,
    );
    const dispatch = useDispatch();
  
    const getBooks = useCallback(() => {
      dispatch(getBooksSaga());
    }, [dispatch]);
  
    const add = useCallback(
      (book: BookReqType) => {
        dispatch(addBookSagaStart(book));
      },
      [dispatch],
    );
  
    const back = useCallback(() => {
      dispatch(goBack());
    }, [dispatch]);
  
    const logout = useCallback(() => {
      dispatch(logoutSagaStart());
    }, [dispatch]);
  
    return  <Add
    books={books}
    loading={loading}
    error={error}
    add={add}
    getBooks={getBooks}
    back={back}
    logout={logout}
  />;

}

export default AddContainer;