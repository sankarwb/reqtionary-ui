import {NgModule} from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';

import {AppRoute} from '../app-route.enum';
import {AngularMaterialModule} from '../angularmaterial/angular-material.module';
import {SharedModule} from '../shared/shared.module';
import { ReqtionaryComponent } from './reqtionary.component';

const routes: Routes = [
  { path: '', component: ReqtionaryComponent,
      children: [
          { path: ':employeeId', loadChildren: '../home/home.module#HomeModule' }
      ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    AngularMaterialModule,
    SharedModule
  ],
  declarations: [
    ReqtionaryComponent
  ]
})

export class ReqtionaryModule { }
