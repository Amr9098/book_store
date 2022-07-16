import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators} from '@angular/forms';
import { Register } from 'src/app/models/register';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  usreg:Register={} as Register;
  data:any;

  constructor(private datas:DataService ,private toastr: ToastrService,private router:Router) { }



  ngOnInit(): void {
  }


  submit(){
    // this.sumitted=true;
    // if(this.form.invalid){
    //   return;
    // }
    this.datas.regiseruser(this.usreg).subscribe({
      next: data => {

        this.data=data;
        console.log(this.data);

        this.toastr.success( 'register successfully (⊙﹏⊙)', 'success' );
        this.router.navigate(['/login']);

      },
      error: error => {
        // alert("error"+error);
        this.toastr.error( 'pleace enter valid data','Error' );

      }
    });
  }

}
