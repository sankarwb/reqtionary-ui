import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AngularMaterialModule } from '../angularmaterial/angular-material.module';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './components/home.component';
import { HomeService } from './services/home.service';

const routes: Routes = [
    {path: '', component: HomeComponent}
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        FormsModule,
        AngularMaterialModule,
        SharedModule
    ],
    declarations: [
        HomeComponent
    ],
    providers: [
        HomeService
    ]
})

export class HomeModule {}
