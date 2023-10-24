import { Injectable } from '@angular/core';
import { JWTTokenService } from './jwttoken.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from 'src/environments/environment'
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CompaniesCrudService {
  constructor(private jwt: JWTTokenService, private http: HttpClient) { }
baseUrl = environment.baseUrl;

  getCompanies() : Observable<any>{
    const token = this.jwt.getToken();
    if(token == null) return of(null);
    const headers = this.setHeaders(token);
    return this.http.get(this.baseUrl+"/api/companies",{headers});
  }

  private setHeaders(token:string):HttpHeaders{
    if (token){
        let headers = new HttpHeaders({'Accept':'*/*', 'Authorization':'bearer '+token});
        return headers;
    }

    return new HttpHeaders({'Accept':'*/*'})
  }

}
