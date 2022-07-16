import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AthComponent } from './components/ath/ath.component';
import { BookdetailsComponent } from './components/bookdetails/bookdetails.component';
import { BooksComponent } from './components/books/books.component';
import { CategoryComponent } from './components/dashboard/category/category.component';
import { DashComponent } from './components/dashboard/dash/dash.component';
import { EditbookComponent } from './components/dashboard/editbook/editbook.component';
import { ProductComponent } from './components/dashboard/product/product.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdmGuard } from './shared/adm.guard';
import { AuthGuard } from './shared/auth.guard';



const routes: Routes = [

  {path: '',redirectTo:'/home',pathMatch:"full" },
  {path: 'home', component:HomeComponent , children: [

    ]},
  {path: 'admin', component: DashComponent, canActivate:[AdmGuard],  children: [
        {path: '',redirectTo:'/admin/products',pathMatch:"full" },
    {path: 'products', component:ProductComponent},
    {path: 'category', component:CategoryComponent},
    {path: 'products/:pid', component:EditbookComponent },

  ]},
  {path: 'books', component: BooksComponent,canActivate:[AuthGuard] },
  {path: 'books/:bid', component:BookdetailsComponent,canActivate:[AuthGuard]},


{path: 'login', component:LoginComponent},
{path: 'register', component:RegisterComponent},
{path: '**', component:HomeComponent},

    // ,{path: '**', component: NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
