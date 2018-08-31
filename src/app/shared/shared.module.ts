import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HeaderComponent } from './components/header.component';
import { AngularMaterialModule } from '../angularmaterial/angular-material.module';
import { SearchBoxComponent } from './components/search-box.component';

@NgModule({
  imports: [
    CommonModule,
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
  providers: []
})
export class SharedModule { }
