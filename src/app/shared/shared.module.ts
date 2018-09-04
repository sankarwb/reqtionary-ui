import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from '../angularmaterial/angular-material.module';

import {
  HeaderComponent,
  SearchBoxComponent,
  RecentActivityComponent
} from './components';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  exports: [
    CommonModule,
    AngularMaterialModule,
    HeaderComponent,
    SearchBoxComponent,
    RecentActivityComponent
  ],
  declarations: [
    HeaderComponent,
    SearchBoxComponent,
    RecentActivityComponent
  ],
  providers: []
})
export class SharedModule { }
