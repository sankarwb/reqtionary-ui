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
import { DataGridPipe } from './pipes/data-grid.pipe';

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
    NavigationPanelComponent,
    DataGridPipe
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
    NavigationPanelComponent,
    DataGridPipe
  ],
  providers: [
    ArtifactsService,
    EmployeeService,
    ProjectsService,
    DataGridPipe
  ]
})
export class SharedModule { }
