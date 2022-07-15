import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBooks } from '../models/ibooks';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BooksService {
private httpheaders={}

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
  getbookbyid(x:number):Observable<IBooks[]>{
    return this.HttpC.get<IBooks[]>(`${environment.apiurl}/books/${x}`);
  }

  addbook(newBook:IBooks):Observable<IBooks>{
    return this.HttpC.post<IBooks>(`http://127.0.0.1:8000/api/books`
    ,JSON.stringify(newBook),this.httpheaders);
  }
}

