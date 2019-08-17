import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FileUploadModule} from 'ng2-file-upload';

import {AngularMaterialModule} from '../angularmaterial/angular-material.module';
import {
  HeaderComponent,
  SearchBoxComponent,
  RecentActivityComponent,
  DataGridComponent,
  SpinnerComponent,
  FileUploaderComponent,
  ArtifactFiltersComponent,
  ArtifactReqtypesComponent,
  UserThumbnailComponent,
  NavigationPanelComponent,
  ConversationsComponent,
  ConversationComponent
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
    AngularMaterialModule,
    FileUploadModule
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
    FileUploaderComponent,
    ArtifactFiltersComponent,
    ArtifactReqtypesComponent,
    UserThumbnailComponent,
    NavigationPanelComponent,
    DataGridPipe,
    ConversationsComponent,
    ConversationComponent
  ],
  declarations: [
    HeaderComponent,
    SearchBoxComponent,
    RecentActivityComponent,
    DataGridComponent,
    SpinnerComponent,
    FileUploaderComponent,
    ArtifactFiltersComponent,
    ArtifactReqtypesComponent,
    UserThumbnailComponent,
    NavigationPanelComponent,
    DataGridPipe,
    ConversationsComponent,
    ConversationComponent
  ],
  providers: [
    ArtifactsService,
    EmployeeService,
    ProjectsService,
    DataGridPipe
  ]
})
export class SharedModule { }
