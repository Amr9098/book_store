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
  constructor(private apibooks:BooksService , private categoryS:CategoryService ,private toastr: ToastrService) { }
  ngOnChanges(): void {
    this.apibooks.getallbooks().subscribe(e => { this.books=e} );
  }

  ngOnInit(): void {
    this.apibooks.getallbooks().subscribe(e => { this.books=e} );
    this.categoryS.getallcategory().subscribe(e => { this.cats=e} );
    console.log(this.newbook);


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


}
