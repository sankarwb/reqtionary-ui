import {NgModule} from '@angular/core';
import {
    Routes,
    RouterModule
} from '@angular/router';

import {AngularMaterialModule} from '../angularmaterial/angular-material.module';
import {SharedModule} from '../shared/shared.module';
import {ArtifactsComponent} from './components';
import {ArtifactsService} from '../shared/services';

const routes: Routes = [
    {path: ':applicationId/:projectId', component: ArtifactsComponent}
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        AngularMaterialModule,
        SharedModule
    ],
    declarations: [
        ArtifactsComponent
    ],
    providers: [
        ArtifactsService
    ]
})

export class ArtifactsModule {}
