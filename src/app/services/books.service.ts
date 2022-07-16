import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBooks } from '../models/ibooks';
import { HttpHeaders } from '@angular/common/http';
// import 'rxjs/add/operator/map';
import { catchError, map, tap } from 'rxjs/operators';
import { Book } from '../models/book';



@Injectable({
  providedIn: 'root'
})
export class BooksService {
private httpheaders={}
configUrl = 'assets/config.json';

  constructor(private HttpC:HttpClient) {

this.httpheaders = {
  headers: new HttpHeaders({
    'Content-Type':'application/json',
  })
}

   }


  getallbooks():Observable<IBooks[]>{
    return this.HttpC.get<IBooks[]>(`http://127.0.0.1:8000/api/books`);
  }


  getbooksbycatid(x:number):Observable<IBooks[]>{
    return this.HttpC.get<IBooks[]>(`${environment.apiurl}/books?category_id=${x}`);

  }
    public optional: any;

  getbookbyid(id: number): Observable<Book> {
    return this.HttpC.get<Book>(`${environment.apiurl}/books/${id}`);
  }

  addbook(newBook:IBooks):Observable<IBooks>{
    return this.HttpC.post<IBooks>(`http://127.0.0.1:8000/api/books`
    ,JSON.stringify(newBook),this.httpheaders);
  }
  deletbookbyid(x:number):Observable<IBooks[]>{
    return this.HttpC.delete<IBooks[]>(`${environment.apiurl}/books/${x}`);
  }


  editbook(newBook:IBooks,id:number):Observable<IBooks>{
    return this.HttpC.put<IBooks>(`http://127.0.0.1:8000/api/books/${id}`
    ,JSON.stringify(newBook),this.httpheaders);
  }



}

