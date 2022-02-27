import { goBack, push } from "connected-react-router";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Detail from "../components/Detail";
import { logout } from "../redux/modules/auth";
import { getBooks } from "../redux/modules/books";
import { RootState } from "../redux/modules/rootReducer";
import {
    editBook as editBookSaga,
    getBooks as getBooksSaga,
  } from '../redux/modules/books';
import { logout as logoutSaga } from '../redux/modules/auth';
import { useParams } from "react-router-dom";
import { idParams } from "./EditContainer";
import { BookResType } from "../types";



const DetailContainer = () => {
    const dispatch = useDispatch();
    const {id} = useParams<idParams>();
    const bookId = Number(id) || -1;
    const books = useSelector<RootState, BookResType[] | null>(
        (state) => state.books.books,
    );
    console.log(books);
    
    const back = useCallback(() => {
        dispatch(goBack());
    }, [dispatch]);

    const error = useSelector<RootState, Error | null>(
        (state) => state.books.error,
      );

    const edit = useCallback(() => {
    dispatch(push(`/edit/${id}`));
    }, [dispatch, id]);

    const logout = useCallback(() => {
        dispatch(logoutSaga());
    }, [dispatch]);

    const getBooks = useCallback(() => {
        dispatch(getBooksSaga());
      }, [dispatch]);


    return <Detail book={books === null ? null : books.find((book)=> book.bookId === bookId)} error={error} back={back} edit={edit} getBooks={getBooks} logout={logout} />
    
}

export default DetailContainer;