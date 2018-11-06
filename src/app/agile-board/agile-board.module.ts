import {NgModule} from '@angular/core';
import {
    Routes,
    RouterModule
} from '@angular/router';

import {SharedModule} from '../shared/shared.module';
import {
    AgileBoardComponent,
    AgileArtifactCardComponent
} from './components';
import {AgileBoardResolver} from './resolvers/agile-board.resolver';

const routes: Routes = [
    {path: ':applicationId', component: AgileBoardComponent}
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedModule
    ],
    declarations: [
        AgileBoardComponent,
        AgileArtifactCardComponent
    ],
    providers: [
        AgileBoardResolver
    ]
})

export class AgileBoardModule {}
