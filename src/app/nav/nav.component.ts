import { Component, OnInit } from '@angular/core';
import { JWTTokenService } from '../_services/jwttoken.service';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
user :string ="";
loggedIn = false ;
constructor(private jwt: JWTTokenService, private accountService: AccountService, private route: Router){
}


  ngOnInit(): void {
 this.getCurrentUser();
  }

  getCurrentUser(){
    this.accountService.currentUser$.subscribe({
      next: (user) => {
        this.loggedIn = !!user;
        this.user = this.jwt.getUser();
      }
    });
  }

  

 logOut(){
  this.accountService.logout();
  this.user ="";
  this.route.navigateByUrl('login');

 }

}
