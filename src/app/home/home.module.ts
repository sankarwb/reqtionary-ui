import {NgModule} from '@angular/core';
import {
    Routes,
    RouterModule
} from '@angular/router';
import {FormsModule} from '@angular/forms';

import {AppRoute} from '../app-route.enum';
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
    {path: `${AppRoute.AGILE}`, loadChildren: '../agile-board/agile-board.module#AgileBoardModule'},
    {path: `${AppRoute.DEFECTS}`, loadChildren: '../artifacts/artifacts.module#ArtifactsModule'},
    {path: `${AppRoute.BACKLOG}`, loadChildren: '../artifacts/artifacts.module#ArtifactsModule'},
    {path: `${AppRoute.PERMENANT_DOCUMENTATION}`, loadChildren: '../artifacts/artifacts.module#ArtifactsModule'},
    {path: `${AppRoute.ARTIFACT}`, loadChildren: '../artifact/artifact.module#ArtifactModule'}
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
