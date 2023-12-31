import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';
import { timer} from 'rxjs'
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  roles = ["Manager", "Administrator"];
  validationErrors : any;
  errorMessage: any;
  registrationSuccess = false;
  constructor(private fb: FormBuilder, private accountService : AccountService,
     private router: Router,
     private toastr: ToastrService
     ){}

  ngOnInit(): void {
  }

    //all of this controls are used by the text-input component
    // to make reusable inpusts except roles control
      registerForm = this.fb.group({
            firstname:['', Validators.required],
            lastname :['', Validators.required],
            username:['', Validators.required],
            email:['', Validators.required],
            password:['', Validators.required],
            phonenumber:['', Validators.required],
            roles: this.fb.array([], Validators.required)
          });
          
  onSubmit(){
    console.log(this.registerForm.value)
    this.accountService.registerUser(this.registerForm.value).subscribe(
      {
        next: ()=>{
          this.validationErrors = null; //set this property to null to remove validation erros in the template
          this.registrationSuccess = true; //when this is true it will display an alert success message
          this.toastr.success('Redirecting to login page','Registration Success');
          this.router.navigateByUrl("/login");
        },
        error: (err)=>{
          this.validationErrors = err.error;
          this.toastr.warning("Something went wrong",'Failed to register');
        }
      }
    );
  }

  onRoleChange(role: string, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    const rolesFormArray = this.registerForm.get('roles') as FormArray;

    if (checked) {
      rolesFormArray.push(this.fb.control(role)); // Add role to FormArray
    } else {
      const index = rolesFormArray.value.indexOf(role);
      if (index !== -1) {
        rolesFormArray.removeAt(index); // Remove role from FormArray
      }
    }
  }
}

