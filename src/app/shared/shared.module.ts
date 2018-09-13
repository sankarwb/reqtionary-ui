import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from '../angularmaterial/angular-material.module';

import {
  HeaderComponent,
  SearchBoxComponent,
  RecentActivityComponent,
  DataGridComponent
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
    RecentActivityComponent,
    DataGridComponent
  ],
  declarations: [
    HeaderComponent,
    SearchBoxComponent,
    RecentActivityComponent,
    DataGridComponent
  ],
  providers: []
})
export class SharedModule { }
