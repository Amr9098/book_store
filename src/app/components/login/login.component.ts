import { Component, OnInit } from '@angular/core';
import { Register } from 'src/app/models/register';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usreg:Register={} as Register;
  data:any;
  token:any;

  constructor(private datas:DataService ,private toastr: ToastrService ,private router:Router ) { }

  ngOnInit(): void {

  }

    login(){

    this.datas.loginuser(this.usreg).subscribe({
      next: data => {

        this.data=data;
        if(this.data.status==1){
          this.token=this.data.data.token;
          localStorage.setItem('token',this.token);
          this.router.navigate(['/books']);

        }else if(this.data.data==0){
          this.toastr.error( JSON.stringify(this.data.message) ,'Error' );

        }


      },
      error: error => {
        // alert("error"+error);
        console.log(error);

        this.toastr.error( 'pleace enter valid data','Error' );

      }
    });
  }
    }






