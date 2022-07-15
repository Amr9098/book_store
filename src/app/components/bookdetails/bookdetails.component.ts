import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';
import { CategoryService } from 'src/app/services/category.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { IBooks } from 'src/app/models/ibooks';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-bookdetails',
  templateUrl: './bookdetails.component.html',
  styleUrls: ['./bookdetails.component.css']
})
export class BookdetailsComponent implements OnInit {

  constructor(private categoryS:CategoryService,private activroute:ActivatedRoute,private apibooks:BooksService ,private locati:Location,private toastr: ToastrService,private HttpC:HttpClient) { }

  bd:IBooks[]=[];
  // bdb:IBooks;

  ngOnInit(): void {



    this.apibooks.getallbooks().subscribe(c => this.bd = c);
    // this.bdb=Array.from(this.bd)
    // console.log(this.bdb);


    // this.bd =this.HttpC.get<IBooks>(`http://127.0.0.1:8000/api/books/1`).subscribe(
    //   this.bd?.name=
    // );
      // console.log(this.bd);

    //  console.log(this.HttpC.get<IBooks>(`${environment.apiurl}/books/${ID}`));









  }

  gitboo(){
    let ID:number = (this.activroute.snapshot.paramMap.get("bid"))?Number (this.activroute.snapshot.paramMap.get("bid"))  : 0;
   this.apibooks.getbookbyid(ID).subscribe(
      next=>{

          // alert(this.bd.name);
        console.log(next);
        alert(next);
      },error=>{
        alert(""+error);
      },

      );

  }



}
