import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from '../angularmaterial/angular-material.module';

import {
  HeaderComponent,
  SearchBoxComponent,
  RecentActivityComponent
} from './components';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AngularMaterialModule
  ],
  exports: [
    CommonModule,
    FormsModule,
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
