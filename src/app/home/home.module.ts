import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AngularMaterialModule } from '../angularmaterial/angular-material.module';
import { SharedModule } from '../shared/shared.module';
import {
    HomeComponent,
    HomeApplicationComponent,
    HomeProjectComponent
} from './components';
import { HomeService } from './services/home.service';
import { EmployeeService } from '../services';

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'agile', loadChildren: '../artifacts/artifacts.module#ArtifactsModule'},
    {path: 'defects', loadChildren: '../artifacts/artifacts.module#ArtifactsModule'},
    {path: 'backlog', loadChildren: '../artifacts/artifacts.module#ArtifactsModule'},
    {path: 'perm.doc', loadChildren: '../artifacts/artifacts.module#ArtifactsModule'}
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        FormsModule,
        AngularMaterialModule,
        SharedModule
    ],
    declarations: [
        HomeComponent,
        HomeApplicationComponent,
        HomeProjectComponent
    ],
    providers: [
        HomeService,
        EmployeeService
    ]
})

export class HomeModule {}
