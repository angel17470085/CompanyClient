import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { JWTTokenService } from '../_services/jwttoken.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  validationErrors : any;
  constructor(private fb:FormBuilder, private accountService: AccountService, 
    private toastr: ToastrService, private jwt:JWTTokenService,
    private router: Router) {}

 response: any;

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
      next:() => {
        this.validationErrors = null;
        this.loginForm.reset();
        this.toastr.success('loged in!','Success');
        this.router.navigateByUrl('readCompanies')
        
      },
      error:(valErrors)=>{
        this.validationErrors = valErrors;
        console.log(this.validationErrors);
      }
    })
  }

}
