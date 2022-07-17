export interface Icomment {
  id: number;
  created_at: string;
  name: null;
  comment_text: string;
  user_id:number;
}
export interface Icomadd {
  book_id: number;
  comment_text: string;
  token:   string;

}
