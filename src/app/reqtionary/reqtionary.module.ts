import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AngularMaterialModule } from '../angularmaterial/angular-material.module';
import { SharedModule } from '../shared/shared.module';
import { ReqtionaryRoutingModule } from './reqtionary.routing';
import { ReqtionaryComponent } from './reqtionary.component';

@NgModule({
  declarations: [
    ReqtionaryComponent
  ],
  imports: [
    RouterModule,
    ReqtionaryRoutingModule,
    AngularMaterialModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [
    ReqtionaryComponent
  ]
})

export class ReqtionaryModule { }
