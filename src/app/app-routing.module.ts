import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookdetailsComponent } from './components/bookdetails/bookdetails.component';
import { BooksComponent } from './components/books/books.component';
import { CategoryComponent } from './components/dashboard/category/category.component';
import { DashComponent } from './components/dashboard/dash/dash.component';
import { EditbookComponent } from './components/dashboard/editbook/editbook.component';
import { ProductComponent } from './components/dashboard/product/product.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path: '',redirectTo:'/home',pathMatch:"full" },
  {path: 'home', component:HomeComponent , children: [
    // {path: '',redirectTo:'/main/home',pathMatch:"full" },
    //   {path: 'home', component: MasterComponent},
    //   {path: 'products', component: ProductsComponent},
    //   {path: 'products/:pid', component: ProdutDetailsComponent},
    ]},

  {path: 'admin', component: DashComponent, children: [
        {path: '',redirectTo:'/admin/products',pathMatch:"full" },
    {path: 'products', component:ProductComponent},
    {path: 'category', component:CategoryComponent},
    {path: 'products/:pid', component:EditbookComponent },

  ]},
  {path: 'books', component: BooksComponent},
  {path: 'books/:bid', component:BookdetailsComponent},

  {path: 'login', component:LoginComponent},


    // ,{path: '**', component: NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
