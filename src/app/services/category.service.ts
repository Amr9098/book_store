import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBooks } from '../models/ibooks';
import { Icategory } from '../models/icategory';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  private httpheaders={}

    constructor(private HttpC:HttpClient) {

  this.httpheaders = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  }


     }

    getallcategory():Observable<Icategory[]>{
      return this.HttpC.get<Icategory[]>(`http://127.0.0.1:8000/api/categorys`);
    }


    getbooksbycatid(x:number):Observable<IBooks[]>{
      return this.HttpC.get<IBooks[]>(`${environment.apiurl}/books?category_id=${x}`);

    }


    addcat(newcat:Icategory):Observable<Icategory>{
      return this.HttpC.post<Icategory>(`${environment.apiurl}/categorys`
      ,JSON.stringify(newcat),this.httpheaders);
    }
  }

