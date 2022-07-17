import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBooks } from '../models/ibooks';
import { Icategory } from '../models/icategory';
import { Icomadd, Icomment } from '../models/icomment';
import {  map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private httpheaders={}

    constructor(private HttpC:HttpClient) {

  this.httpheaders = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  }


     }

    getcommentbybookid(id:number): Observable<Icomment[]>{
      return this.HttpC.get<Icomment[]>(`http://127.0.0.1:8000/api/comments/1`);
    }


    addcomment(newcomment:Icomadd):Observable<Icomadd>{
      return this.HttpC.post<Icomadd>(`http://127.0.0.1:8000/api/comments`
      ,JSON.stringify(newcomment),this.httpheaders);}

      // deletcomment(x:number):Observable<Icategory[]>{
      //   return this.HttpC.delete<Icategory[]>(`${environment.apiurl}/categorys/${x}`);
      // }




  }

