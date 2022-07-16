import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IBooks } from 'src/app/models/ibooks';
import { Icategory } from 'src/app/models/icategory';
import { BooksService } from 'src/app/services/books.service';
import { CategoryService } from 'src/app/services/category.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Book } from 'src/app/models/book';
import {  map } from 'rxjs/operators';


@Component({
  selector: 'app-editbook',
  templateUrl: './editbook.component.html',
  styleUrls: ['./editbook.component.css']
})
export class EditbookComponent implements OnInit {
  cats:Icategory[]=[];
  vv!:IBooks;
  prd:any | undefined=undefined;
  editbook:IBooks={} as IBooks;
  loadedBook: Book[] = [];
 isFetching = false;

  constructor(private categoryS:CategoryService,private activroute:ActivatedRoute,private apibooks:BooksService ,private locati:Location,private toastr: ToastrService,private HttpC:HttpClient ) { }

  ngOnInit(): void {
    let ID:number = (this.activroute.snapshot.paramMap.get("pid"))?Number (this.activroute.snapshot.paramMap.get("pid"))  : 0;
    this.fetchbook(ID);

    this.categoryS.getallcategory().subscribe(e => { this.cats=e} );





  }

  editbookbyid() {
    let ID:number = (this.activroute.snapshot.paramMap.get("pid"))?Number (this.activroute.snapshot.paramMap.get("pid"))  : 0;
    this.apibooks.editbook(this.editbook,ID).subscribe({
      next: data => {
        this.locati.back();
      },
      error: error => {
        // alert("error"+error);
        this.toastr.error( 'Enter what you want to edit','Error' );

      }
  });

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
        console.log(this.loadedBook);

      });
}
}
