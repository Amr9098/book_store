import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FbodyComponent } from './components/fbody/fbody.component';
import { HomeComponent } from './components/home/home.component';
import { BooksComponent } from './components/books/books.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule  } from '@angular/common/http';
import { AdminComponent } from './components/dashboard/admin/admin.component';
import { ProductComponent } from './components/dashboard/product/product.component';
import { DashComponent } from './components/dashboard/dash/dash.component';
import { CategoryComponent } from './components/dashboard/category/category.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    FbodyComponent,
    HomeComponent,
    BooksComponent,
    LoginComponent,
    AdminComponent,
    ProductComponent,
    DashComponent,
    CategoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      progressBar:true,
      closeButton:true,
    })  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
