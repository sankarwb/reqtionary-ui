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
  ArtifactReqtypesComponent,
  UserThumbnailComponent,
  NavigationPanelComponent
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
    ArtifactReqtypesComponent,
    UserThumbnailComponent,
    NavigationPanelComponent
  ],
  declarations: [
    HeaderComponent,
    SearchBoxComponent,
    RecentActivityComponent,
    DataGridComponent,
    SpinnerComponent,
    ArtifactFiltersComponent,
    ArtifactReqtypesComponent,
    UserThumbnailComponent,
    NavigationPanelComponent
  ],
  providers: [
    ArtifactsService,
    EmployeeService,
    ProjectsService
  ]
})
export class SharedModule { }
