import { Link } from "react-router-dom";
import {BookOutlined, DeleteOutlined, EditOutlined, HomeOutlined} from '@ant-design/icons';
import moment from "moment";
import { Button, Tooltip } from "antd";
import styles from "./Book.module.css";

interface BookProps {
  bookId: number;
  title: string;
  author: string;
  url: string;
  createdAt: string;
  deleteBook: (bookId: number) => void;
  editBook: (bookId: number) => void;
}

const Book : React.FC<BookProps> =  ({
    bookId, 
    title, 
    author, 
    createdAt, 
    url,
    deleteBook,
    editBook
    }) => { return (
    <div className={styles.book}>
        <div className={styles.title}>
            <Link to ={`/book/${bookId}`} className={styles.link_detail_title}>
                <BookOutlined /> {title}
            </Link>    
        </div>
        <div className={styles.author}>
            <Link to ={`/book/${bookId}`} className={styles.link_detail_author}>
                {author}
            </Link>    
        </div>        
        <div className={styles.created}>
            {moment(createdAt).format('MM-DD-YYYY hh:mm a')}
        </div>
        <div className={styles.tooltips}>
            <Tooltip title ={url}>
                <a href={url} target="_blank" rel="noreferrer" className={styles.link_url}>
                    <Button size="small" type="primary" shape="circle" icon={<HomeOutlined/>} className={styles.button_url}/>
                </a>
            </Tooltip>
            <Tooltip title ='Edit'>
                    <Button size="small" shape="circle" icon={<EditOutlined/>} className={styles.button_edit} onClick={clickEdit}/>
            </Tooltip>
            <Tooltip title = 'Delete'>
                    <Button size="small" type="primary" shape="circle" danger icon={<DeleteOutlined/>}  onClick= {clickDelete} className={styles.button_delete}/>
            </Tooltip>
        </div>
    </div>
    );
    function clickDelete() {
        deleteBook(bookId);
    }
    function clickEdit() {
        editBook(bookId);
    }
};

export default Book;