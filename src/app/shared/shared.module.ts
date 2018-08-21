import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { GlobalSharedService, EventsService, HttpInterceptorService } from './services';
import { HeaderComponent } from './components/header.component';
import { AngularMaterialModule } from '../angularmaterial/angular-material.module';
import { SearchBoxComponent } from './components/search-box.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    AngularMaterialModule
  ],
  exports: [
    HeaderComponent,
    SearchBoxComponent
  ],
  declarations: [
    HeaderComponent,
    SearchBoxComponent
  ],
  providers: [
      HttpInterceptorService,
      GlobalSharedService,
      EventsService
  ]
})
export class SharedModule { }
