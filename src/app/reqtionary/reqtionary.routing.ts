import {NgModule} from '@angular/core';
import {
    Routes,
    RouterModule
} from '@angular/router';
import {ReqtionaryComponent} from './reqtionary.component';

const routes: Routes = [
    { path: '', component: ReqtionaryComponent,
        children: [
            { path: ':employeeId', loadChildren: '../home/home.module#HomeModule' }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ]
})

export class ReqtionaryRoutingModule {}
