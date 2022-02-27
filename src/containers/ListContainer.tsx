import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import List from "../components/List";
import { BookResType } from "../types";
import {getBooks as getBooksSagaStart, deleteBook as deleteBookSagaStart,} from "../redux/modules/books";
import {logout as logoutSagaStart} from '../redux/modules/auth';
import { push } from "connected-react-router";
import { RootState } from "../redux/modules/rootReducer";
import { useParams } from "react-router-dom";

const ListContainer : React.FC = (props) =>  {
    const books = useSelector<RootState, BookResType[] | null>(
        (state) => state.books.books);
    const loading = useSelector<RootState, boolean>((state)=>state.books.loading);
    const error = useSelector<RootState, Error | null>((state)=>state.books.error);

    const dispatch = useDispatch();

    const getBooks = useCallback(() => {
        dispatch(getBooksSagaStart());
    },[dispatch]);

    const logout = useCallback(() => {
        dispatch(logoutSagaStart());
    },[dispatch]);

    const goAdd = useCallback(() => {
        dispatch(push("/add"));
    }, [dispatch]);

    const deleteBook = useCallback((bookId:number) => {
        dispatch(deleteBookSagaStart(bookId));
    }, [dispatch]);

    const editBook = useCallback((bookId:number) => {
        dispatch(push(`/edit/${bookId}`));
    }, [dispatch]);

    return <List {...props} books={books} loading ={loading} getBooks={getBooks} error ={error} logout ={logout} 
    goAdd={goAdd} deleteBook={deleteBook} editBook={editBook}/>;
}

export default ListContainer;
