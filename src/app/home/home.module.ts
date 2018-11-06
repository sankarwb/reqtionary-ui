import {NgModule} from '@angular/core';
import {
    Routes,
    RouterModule
} from '@angular/router';
import {FormsModule} from '@angular/forms';

import {AngularMaterialModule} from '../angularmaterial/angular-material.module';
import {SharedModule} from '../shared/shared.module';
import {
    HomeComponent,
    HomeApplicationComponent,
    HomeProjectComponent
} from './components';
import {HomeService} from './services/home.service';
import {HomeResolver} from './resolvers/home.resolver';

const routes: Routes = [
    {path: '', component: HomeComponent, resolve: {applications: HomeResolver}},
    {path: 'agile', loadChildren: '../agile-board/agile-board.module#AgileBoardModule'},
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
        HomeResolver
    ]
})

export class HomeModule {}
