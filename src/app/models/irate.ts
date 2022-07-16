export interface Irate {

}


  export interface User {
      id: number;
      name: string;
      email: string;
  }

  export interface Book {
      id: number;
      name: string;
      description: string;
      price: number;
      category_id: number;
  }

  export interface Datum {
      id: number;
      user: User;
      book: Book;
      value: string;
  }

  export interface RootObject {
      data: Datum[];
  }



