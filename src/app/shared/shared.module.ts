import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxNavbarModule } from 'ngx-bootstrap-navbar';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxNavbarModule,
    TooltipModule.forRoot(),
    AlertModule.forRoot(),
    ToastrModule.forRoot({positionClass:'toast-top-full-width'})
  ],
  exports:[
    FormsModule,
    ReactiveFormsModule,
    NgxNavbarModule,
    TooltipModule,
    AlertModule,
    ToastrModule
  ]
})
export class SharedModule { }
