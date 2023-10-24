import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http'
import { BehaviorSubject, catchError, map, throwError } from 'rxjs';
import { JWTTokenService } from './jwttoken.service';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = "http://www.companyemployees.codemaze";
  private currentUserSource = new BehaviorSubject<string | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private jwt : JWTTokenService, private toastr: ToastrService) { }

  

  registerUser(registrationForm:any)
  {
    return this.http.post(this.baseUrl+"/api/authentication",registrationForm);
  }

  login(loginForm: any)
  {
    return this.http.post(this.baseUrl+'/api/authentication/login',loginForm).pipe(
      map(
        (resp: any) => {
          const response = resp;
          this.jwt.saveToken(response.token);
          this.setUser();
        }
      ),
      catchError((err:HttpErrorResponse)=>{
        const validationErrors = err.error;
        this.toastr.error("Failed to log in..","Sorry");
        return throwError(()=> validationErrors);
      })
    )    
  }

  logout()
  {
    this.jwt.destroyToken();
    this.currentUserSource.next(null);
  }

  setUser()
  {
    const user = this.jwt.getUser();
    if (!user) return;
    this.currentUserSource.next(user);
  }

 

  
}
