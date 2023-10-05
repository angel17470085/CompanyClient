import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { catchError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AccountService {


  baseUrl = "http://www.companyemployees.codemaze";
  constructor(private http: HttpClient) { }

  registerUser(model:any)
  {
    return this.http.post(this.baseUrl+"/api/authentication",model);
  }
}
