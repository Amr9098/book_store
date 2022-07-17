import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IBooks } from '../models/ibooks';
import { Icategory } from '../models/icategory';
import { Datum, Irate, RootObject } from '../models/irate';

@Injectable({
  providedIn: 'root'
})
export class RateService {


  private httpheaders={}

    constructor(private HttpC:HttpClient) {

  this.httpheaders = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      // "Authorization": "token " + localStorage.getItem("token")

    })
  }


     }

    getallrate(){
      return this.HttpC.get<RootObject>(`http://127.0.0.1:8000/api/ratebook`);
    }

    // getbooksbycatid(x:number){
    //   return this.HttpC.get<IBooks[]>(`${environment.apiurl}/books?category_id=${x}`);

    // }


    addrate(newrate:Irate){
      return this.HttpC.post<Irate>(`${environment.apiurl}/ratebook`
      ,JSON.stringify(newrate),this.httpheaders);}

      // deletcat(x:number){
      //   return this.HttpC.delete<Icategory[]>(`${environment.apiurl}/categorys/${x}`);
      // }
  }

