import {NgModule} from '@angular/core';
import {
    Routes,
    RouterModule
} from '@angular/router';

import {AngularMaterialModule} from '../angularmaterial/angular-material.module';
import {SharedModule} from '../shared/shared.module';
import {
    ArtifactComponent,
    ArtifactDetailsComponent,
    ArtifactCommentsComponent,
    ArtifactAssociationsComponent,
    ArtifactAttachmentsComponent,
    ArtifactHistoryComponent
} from './components';
import {ArtifactResolve} from './resolvers/artifact.resolve';
import {ArtifactsService} from '../shared/services';

const routes: Routes = [
    {
        path: ':applicationId/create',
        component: ArtifactComponent
    },{
        path: ':applicationId/edit/:artifactId',
        component: ArtifactComponent,
        resolve: {
            artifact: ArtifactResolve
        }
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        AngularMaterialModule,
        SharedModule
    ],
    declarations: [
        ArtifactComponent,
        ArtifactDetailsComponent,
        ArtifactCommentsComponent,
        ArtifactAssociationsComponent,
        ArtifactAttachmentsComponent,
        ArtifactHistoryComponent
    ],
    providers: [
        ArtifactsService,
        ArtifactResolve
    ]
})

export class ArtifactModule {}
