import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IBooks } from 'src/app/models/ibooks';
import { Icategory } from 'src/app/models/icategory';
import { BooksService } from 'src/app/services/books.service';
import { CategoryService } from 'src/app/services/category.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-editbook',
  templateUrl: './editbook.component.html',
  styleUrls: ['./editbook.component.css']
})
export class EditbookComponent implements OnInit {
  cats:Icategory[]=[];
 editbook:IBooks={} as IBooks;
 vv!:IBooks;
 prd:any | undefined=undefined;

  constructor(private categoryS:CategoryService,private activroute:ActivatedRoute,private apibooks:BooksService ,private locati:Location,private toastr: ToastrService,private HttpC:HttpClient ) { }

  ngOnInit(): void {
    this.categoryS.getallcategory().subscribe(e => { this.cats=e} );
    this.HttpC.get<IBooks>(`http://127.0.0.1:8000/api/books/1`).subscribe(e => { this.vv=e});

    let foundedPrd= this.apibooks.getbookbyid(1);
      if(foundedPrd){
        this.prd=foundedPrd;
        console.log(this.prd);

      }
      else{
        alert("Product not found");
        // this.l.back();
      }


      // this.HttpC.get<IBooks[]>(`http://127.0.0.1:8000/api/books/1`);

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
}
