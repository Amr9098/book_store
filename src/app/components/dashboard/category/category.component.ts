import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Icategory } from 'src/app/models/icategory';
import { CategoryService } from 'src/app/services/category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit,OnChanges {
  cats:Icategory[]=[];
  newcat:Icategory={} as Icategory;


  constructor(private categoryS:CategoryService,private toastr: ToastrService) { }
  ngOnChanges(): void {
    this.categoryS.getallcategory().subscribe(e => { this.cats=e} );

  }

  ngOnInit(): void {
    this.categoryS.getallcategory().subscribe(e => { this.cats=e} );

  }
  addCategory(){

    if(this.newcat.name==undefined){
      this.toastr.error('Enter name of the new category', 'error');
    }else{
    this.categoryS.addcat(this.newcat).subscribe({
      next: data => {
        this.toastr.success('Category added successfully', 'success');

      },
      error: error => {
        this.toastr.error('Category not added', 'error');
      }
  });
    }
  }

  deletcat(id:number) {

    this.categoryS.deletcat(id).subscribe({
      next: data => {
        this.toastr.success('categorys deleted successfully', 'success');

      },
      error: error => {
        this.toastr.success('categorys deleted successfully', 'success');

      }
  });

  }

}
