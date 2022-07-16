import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';
import { CategoryService } from 'src/app/services/category.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { IBooks } from 'src/app/models/ibooks';
import { environment } from 'src/environments/environment';
import { Book } from 'src/app/models/book';
import { catchError, map, tap } from 'rxjs/operators';
import { Datum } from 'src/app/models/irate';


@Component({
  selector: 'app-bookdetails',
  templateUrl: './bookdetails.component.html',
  styleUrls: ['./bookdetails.component.css']
})
export class BookdetailsComponent implements OnInit {

  constructor(private categoryS:CategoryService,private activroute:ActivatedRoute,private apibooks:BooksService ,private locati:Location,private toastr: ToastrService,private HttpC:HttpClient) { }
  data!:Book;
  bd:IBooks[]=[];
  // bdb:IBooks;

  loadedRate: Datum[] = [];
  loadedBook: Book[] = [];
  isFetching = false;

  public optional: any;
  ngOnInit(): void {



    this.apibooks.getallbooks().subscribe(c => this.bd = c);

    let ID:number = (this.activroute.snapshot.paramMap.get("bid"))?Number (this.activroute.snapshot.paramMap.get("bid"))  : 0;

    this.fetchbook(ID);





  }

   fetchbook(id:number) {
    this.isFetching = true;
    this.HttpC
      .get<{ [key: string]: Book }>(
        `http://127.0.0.1:8000/api/books/${id}`
      )
      .pipe(
        map(responseData => {
          const postsArray: Book[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push(responseData[key]);
            }
          }
          // console.log(postsArray);
          return postsArray;

        })
      )
      .subscribe(posts => {
        this.isFetching = false;
        this.loadedBook = posts;

      });
  }
   fetchrate() {
    this.isFetching = true;
    this.HttpC
      .get<{ [key: string]: Datum }>(
        `http://127.0.0.1:8000/api/ratebook`
      )
      .pipe(
        map(responseData => {
          const postsArray: Datum[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push(responseData[key]);
            }
          }
          // console.log(postsArray);
          return postsArray;
        })
      )
      .subscribe(posts => {
        this.isFetching = false;
        this.loadedRate = posts;
        console.log(this.loadedRate);


      });
  }
}





