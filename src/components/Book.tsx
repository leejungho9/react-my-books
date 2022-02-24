import { Link } from "react-router-dom";
import {BookOutlined, DeleteOutlined, EditOutlined, HomeOutlined} from '@ant-design/icons';
import { BookType } from "../types";
import moment from "moment";
import { Button, Tooltip } from "antd";


interface BookProps extends BookType {}


const Book : React.FC<BookProps> = ({bookId, title, author, createdAt, url}) => (
<div>
    <div>
        <Link to ={`/book/${bookId}`}>
            <BookOutlined /> {title}
        </Link>    
    </div>
    <div>
        <Link to ={`/book/${bookId}`}>
            {author}
        </Link>    
    </div>        
    <div>{moment(createdAt).format('MM-DD-YYYY hh:mm a')}</div>
    <div>
        <Tooltip title ={url}>
            <a href={url} target="_blank" rel="noreferrer">
                <Button size="small" type="primary" shape="circle" icon={<HomeOutlined/>}/>
            </a>
        </Tooltip>
        <Tooltip title ='Edit'>
                <Button size="small" shape="circle" icon={<EditOutlined/>}/>
        </Tooltip>
        <Tooltip title = 'Delete'>
                <Button size="small" type="primary" shape="circle" danger icon={<DeleteOutlined/>}/>
        </Tooltip>
    </div>
</div>
);

export default Book;