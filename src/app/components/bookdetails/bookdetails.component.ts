import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';
import { ToastrService } from 'ngx-toastr';
import { IBooks } from 'src/app/models/ibooks';
import { environment } from 'src/environments/environment';
import { Book } from 'src/app/models/book';
import { catchError, map, tap } from 'rxjs/operators';
import { Datum, Irate } from 'src/app/models/irate';
import { RateService } from 'src/app/services/rate.service';
import jwt_decode from "jwt-decode";


@Component({
  selector: 'app-bookdetails',
  templateUrl: './bookdetails.component.html',
  styleUrls: ['./bookdetails.component.css']
})
export class BookdetailsComponent implements OnInit {

  constructor(private activroute:ActivatedRoute,private apibooks:BooksService ,private toastr: ToastrService,private HttpC:HttpClient , private rates:RateService) { }
  bd:IBooks[]=[];
  // bdb:IBooks;
  newrate:Irate={} as Irate;
   ii:number = (this.activroute.snapshot.paramMap.get("bid"))?Number (this.activroute.snapshot.paramMap.get("bid"))  : 0;

   token:any = localStorage.getItem('token');

  loadedRate: Datum[] = [];
  loadedBook: Book[] = [];
  isFetching = false;


  public optional: any;
  ngOnInit(): void {

    let ID:number = (this.activroute.snapshot.paramMap.get("bid"))?Number (this.activroute.snapshot.paramMap.get("bid"))  : 0;

    this.apibooks.getallbooks().subscribe(c => this.bd = c);

    
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
  onRatingSet(rating: number): void {
    console.warn(`User set rating to ${rating}`);


    this.newrate.book_id = 1;
      this.newrate.value = rating;
      this.newrate.token = this.token;

    this.rates.addrate(this.newrate).subscribe({
      next: data => {
        this.toastr.success('rate added successfully', 'success');

      },
      error: error => {
        this.toastr.warning(' Rating book already ', 'warning');
      }
  });

  }
}





