

export interface BookReqType{
    title : string;
    message : string;
    author : string;
    url : string;

}
export interface BookResType {
    bookId: number;
    title: string;
    author: string;
    message: string;
    url: string;
    createdAt: string;
  }
  
export type LoginReqType = {
    email : string;
    password : string;
}