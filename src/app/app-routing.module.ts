import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReadCompaniesComponent } from './companies/read-companies/read-companies.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { authorizeGuard } from './_guards/authorize.guard';

const routes: Routes = [
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'readCompanies', component: ReadCompaniesComponent, canActivate:[authorizeGuard]}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
