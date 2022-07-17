export interface Icomment {
  id: number;
  created_at: Date;
  name: null;
  comment_text: string;
}
export interface Icomadd {
  book_id: number;
  comment_text: string;
  token:   string;

}
