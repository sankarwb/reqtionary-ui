import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { GlobalSharedService, EventsService, HttpInterceptorService } from './services';
import { HeaderComponent } from './components/header.component';
import { AngularMaterialModule } from '../angularmaterial/angular-material.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    AngularMaterialModule
  ],
  exports: [
    HeaderComponent
  ],
  declarations: [
    HeaderComponent
  ],
  providers: [
      HttpInterceptorService,
      GlobalSharedService,
      EventsService
  ]
})
export class SharedModule { }
