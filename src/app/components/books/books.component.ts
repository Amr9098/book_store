import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IBooks } from 'src/app/models/ibooks';
import { Icategory } from 'src/app/models/icategory';
import { BooksService } from 'src/app/services/books.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit,OnChanges {

  books:IBooks[]=[];
  cat:Icategory[]=[];

  constructor(private apibooks:BooksService ,private apicat:CategoryService ) { }
  ngOnChanges(): void {

   this.apibooks.getallbooks().subscribe(e => { this.books=e} );

  }

  ngOnInit(): void {
    this.apibooks.getallbooks().subscribe(e => { this.books=e} );
    this.apicat.getallcategory().subscribe(e => { this.cat=e} );


  }




}
