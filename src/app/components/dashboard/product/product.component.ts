import { Component, OnChanges, OnInit } from '@angular/core';
import { IBooks } from 'src/app/models/ibooks';
import { Icategory } from 'src/app/models/icategory';
import { BooksService } from 'src/app/services/books.service';
import { CategoryService } from 'src/app/services/category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit,OnChanges {
  books:IBooks[]=[];
  cats:Icategory[]=[];
  newbook:IBooks={} as IBooks;
  catid:number = 0;
  // viewbook:IBooks|undefined;
  viewbook:IBooks={} as IBooks;

  ss:number = 0;
  // viewbook:IBooks;

  constructor(private apibooks:BooksService , private categoryS:CategoryService ,private toastr: ToastrService) { }
  ngOnChanges(): void {
    this.apibooks.getallbooks().subscribe(e => { this.books=e} );
    this.categoryS.getallcategory().subscribe(e => { this.cats=e} );

  }

  ngOnInit(): void {
    this.apibooks.getallbooks().subscribe(e => { this.books=e} );

    this.categoryS.getallcategory().subscribe(e => { this.cats=e} );

    // this.viewbookbyid();

    console.log(this.books);
    // this.viewbook=this.books.find((x)=>x.id=1);
    // console.log(this.viewbook);



  }





  inssrtnewbook() {

    this.apibooks.addbook(this.newbook).subscribe({
      next: data => {
        this.toastr.success('book added successfully', 'success');

      },
      error: error => {
        this.toastr.error('Book not add', 'error');
      }
  });

  }
  deletebook(id:number) {

    this.apibooks.deletbookbyid(id).subscribe({
      next: data => {
        this.toastr.success('book deleted successfully', 'success');

      },
      error: error => {
        // this.toastr.error('Book not deleted ◉_◉ ', 'error');
        this.toastr.success('book deleted successfully', 'success');

      }
  });

  }
  editbook(id:number) {

    this.apibooks.editbook(this.newbook,id).subscribe({
      next: data => {
        this.toastr.success('book edited successfully', 'success');

      },
      error: error => {
        this.toastr.error('Book not edit', 'error');
      }
  });

  }




}
