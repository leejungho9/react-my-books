import { PageHeader, Table, Button } from "antd"
import {  useEffect } from "react";
import { BookResType } from "../types";
import Book from "./Book";
import Layout from "./Layout"
import styles from "./List.module.css";


interface BooksProp {
    books : BookResType[] | null ;
    loading : boolean;
    error : Error | null;
    getBooks : () => void;
    logout : () => void;
    goAdd : () => void;
    deleteBook : (bookId : number) => void;
    editBook : (bookId : number) => void;
}
const Books : React.FC<BooksProp> = ({
    books, loading, getBooks, error, logout, goAdd, deleteBook, editBook})=>{
    
    useEffect(()=> {
        getBooks();
    }, [getBooks]);

    useEffect(()=> {
        if(error) {
            logout();
        }
    },[error, logout]);

  
    return (
        <Layout>
           <PageHeader title={<div>Book List</div>}
           extra = {[
               <Button key="2" type="primary" onClick={goAdd} className={styles.button}>Add Book</Button>,
               <Button key="1" type="primary" onClick ={logout} className={styles.button}>Logout</Button>
          ] }
           />
        <Table dataSource={books || []} 
            columns={[
            { title : 'Book',
                dataIndex : 'book',
                key : 'book',
                render : (text, record) => <Book {...record} deleteBook={deleteBook} editBook={editBook}/>
            },
            ]}
            
            loading={books === null || loading }
            showHeader= {false}
            rowKey="bookId"
            pagination={false}
            className={styles.table}
            />
        </Layout>       
    );

};

export default Books;