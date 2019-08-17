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
    ArtifactAttributesComponent,
    ArtifactCommentsComponent,
    ArtifactAssociationsComponent,
    SelectAssociationDialog,
    ArtifactAttachmentsComponent,
    ArtifactHistoryComponent
} from './components';
import {ArtifactResolve} from './resolvers/artifact.resolve';
import {ArtifactsService} from '../shared/services';

const routes: Routes = [
    {
        path: ':applicationId/:projectId/:requirementTypeId/create',
        component: ArtifactComponent,
        resolve: {
            result: ArtifactResolve
        }
    },{
        path: ':applicationId/:projectId/:requirementTypeId/edit/:artifactId',
        component: ArtifactComponent,
        resolve: {
            result: ArtifactResolve
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
        ArtifactAttributesComponent,
        ArtifactCommentsComponent,
        ArtifactAssociationsComponent,
        SelectAssociationDialog,
        ArtifactAttachmentsComponent,
        ArtifactHistoryComponent
    ],
    providers: [
        ArtifactsService,
        ArtifactResolve
    ],
    entryComponents: [SelectAssociationDialog]
})

export class ArtifactModule {}
