import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  validationErrors : any;
  constructor(private fb:FormBuilder, private accountService: AccountService, private toastr: ToastrService) {}

  loginForm = this.fb.group({
    username:['',Validators.required],
    password:['',Validators.required]
  });

  ngOnInit(): void {
  }



  login()
  {
    console.log(this.loginForm.value);
    this.accountService.login(this.loginForm.value).subscribe({
      next:(response) => {
        this.validationErrors = null;
        this.toastr.success('loged in!','Success');
        console.log(response);
      },
      error: (err) =>{
        this.toastr.error("Failed to log in..","Sorry");
        this.validationErrors = err.error;
        console.log(err);
      }
    })
  }

}
