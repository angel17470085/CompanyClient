import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class JWTTokenService {

  constructor() { }

  getToken() : string | null{
    const token = window.localStorage['jwtToken'];
    return token || null;
  }

getUser(){
  return window.localStorage['user'];
}

  saveToken(token:string) : void{
    window.localStorage['jwtToken']= token;
    const userObject =this.decodeToken(token);
    window.localStorage['user'] = userObject?.name;
  }

  destroyToken() : void{
    window.localStorage.removeItem('jwtToken');
    window.localStorage.removeItem('user');
  }

  decodeToken(token: string)
  {
    try
    {
      const parts = token.split('.');
      if (parts.length !== 3) 
      {
        throw new Error('Invalid token format');
      }
       // Decode the payload (part 1 is the header, part 2 is the payload)
       const payload = JSON.parse(atob(parts[1]));

       // Access the claims
       const name = payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
       const role = payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

       return { name, role};
    }
    catch (error)
     {
      // Handle decoding errors, if any
      console.error('Error decoding token:', error);
      return null;
    }
  }
}
