import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { catchError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = "http://www.companyemployees.codemaze";
  constructor(private http: HttpClient) { }

  registerUser(registrationForm:any)
  {
    return this.http.post(this.baseUrl+"/api/authentication",registrationForm);
  }

  login(loginForm: any)
  {
    return this.http.post(this.baseUrl+'/api/authentication/login',loginForm);
  }
}
