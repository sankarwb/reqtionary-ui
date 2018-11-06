import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {AngularMaterialModule} from '../angularmaterial/angular-material.module';
import {
  HeaderComponent,
  SearchBoxComponent,
  RecentActivityComponent,
  DataGridComponent,
  SpinnerComponent,
  ArtifactFiltersComponent,
  ArtifactReqtypesComponent
} from './components';
import {
  ArtifactsService,
  EmployeeService,
  ProjectsService
} from './services';

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
    DataGridComponent,
    SpinnerComponent,
    ArtifactFiltersComponent,
    ArtifactReqtypesComponent
  ],
  declarations: [
    HeaderComponent,
    SearchBoxComponent,
    RecentActivityComponent,
    DataGridComponent,
    SpinnerComponent,
    ArtifactFiltersComponent,
    ArtifactReqtypesComponent
  ],
  providers: [
    ArtifactsService,
    EmployeeService,
    ProjectsService
  ]
})
export class SharedModule { }
