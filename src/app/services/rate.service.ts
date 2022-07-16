import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IBooks } from '../models/ibooks';
import { Icategory } from '../models/icategory';
import { Datum, RootObject } from '../models/irate';

@Injectable({
  providedIn: 'root'
})
export class RateService {


  private httpheaders={}

    constructor(private HttpC:HttpClient) {

  this.httpheaders = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  }


     }

    getallrate(){
      return this.HttpC.get<RootObject>(`http://127.0.0.1:8000/api/ratebook`);
    }

    // getbooksbycatid(x:number){
    //   return this.HttpC.get<IBooks[]>(`${environment.apiurl}/books?category_id=${x}`);

    // }


    addrate(newcat:Icategory){
      return this.HttpC.post<Icategory>(`${environment.apiurl}/categorys`
      ,JSON.stringify(newcat),this.httpheaders);}

      // deletcat(x:number){
      //   return this.HttpC.delete<Icategory[]>(`${environment.apiurl}/categorys/${x}`);
      // }
  }

