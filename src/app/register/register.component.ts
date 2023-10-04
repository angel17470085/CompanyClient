import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { AccountService } from '../_services/account.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  roles = ["Manager", "Administrator"];
  validationErrors : string[]|undefined;
  registerForm : FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder, private acountService : AccountService){}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    //all of this controls are used by the text-input component
    // to make reusable inpusts except roles control
    this.registerForm = this.fb.group({
      firstname:['', Validators.required],
      lastname :['', Validators.required],
      username:['', Validators.required],
      email:['', Validators.required],
      password:['', Validators.required],
      phonenumber:['', Validators.required],
      roles: this.fb.array([], Validators.required)
    });
  }
    
  onSubmit(){
    this.acountService.registerUser(this.registerForm.value).subscribe({
      complete: () => {console.log("user registed succesfully")},
      error: (error) => {this.validationErrors = error}
    });
    console.log(this.registerForm.value)
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

