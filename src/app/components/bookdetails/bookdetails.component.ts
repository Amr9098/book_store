import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
import { CommentService } from 'src/app/services/comment.service';
import { Icomadd, Icomment } from 'src/app/models/icomment';


@Component({
  selector: 'app-bookdetails',
  templateUrl: './bookdetails.component.html',
  styleUrls: ['./bookdetails.component.css']
})
export class BookdetailsComponent implements OnInit,OnChanges {

  constructor(private activroute:ActivatedRoute,private apibooks:BooksService ,private toastr: ToastrService,private HttpC:HttpClient , private rates:RateService,private apicomment:CommentService) { }
  ngOnChanges(): void {
    this.fetchcomment();
  }
  bd:IBooks[]=[];
  // bdb:IBooks;
  newrate:Irate={} as Irate;
  newcomment:Icomadd={} as Icomadd;
   ii:number = (this.activroute.snapshot.paramMap.get("bid"))?Number (this.activroute.snapshot.paramMap.get("bid"))  : 0;
   token:any = localStorage.getItem('token');
  loadedRate: Datum[] = [];
  loadedBook: Book[] = [];
  isFetching = false;
  bookcomment:Icomment[] = [];
  commentcount:number = 0;

  comtext:string = "";


  public optional: any;
  ngOnInit(): void {

    let ID:number = (this.activroute.snapshot.paramMap.get("bid"))?Number (this.activroute.snapshot.paramMap.get("bid"))  : 0;

    this.fetchcomment();

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
        // console.log(this.loadedRate);


      });
  }
  onRatingSet(rating: number): void {
    console.warn(`User set rating to ${rating}`);


    this.newrate.book_id = this.ii;
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
  fetchcomment() {
    // this.isFetching = true;
    this.HttpC
      .get<{ [key: string]: Icomment }>(
        `http://127.0.0.1:8000/api/comments/1`
      )
      .pipe(
        map(responseData => {
          const postsArray: Icomment[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push(responseData[key]);
            }
          }
          return postsArray;


        })
      )
      .subscribe(posts => {
        // this.isFetching = false;

        this.bookcomment = posts;
        this.commentcount=this.bookcomment.length;

      });
  }

  addnewcomment(): void {


    this.newcomment.book_id = this.ii;
    this.newcomment.comment_text = this.comtext;
      this.newcomment.token = this.token;

    this.apicomment.addcomment(this.newcomment).subscribe({
      next: data => {
          if(data.comment_text =="The comment text must be at least 5 characters."||data.comment_text =="The comment text field is required."
          ){
            this.toastr.error(data.comment_text, "error");
          }else{

            this.toastr.success('comment added successfully', 'success');
          }


      },
      error: error => {
        this.toastr.error(' oops........', "error");
      }
  });

  }



}





