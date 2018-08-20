import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AngularMaterialModule } from '../angularmaterial/angular-material.module';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './components/login.component';
import { LoginService } from './services/login.service';

const routes: Routes = [
    {path: '', component: LoginComponent}
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        FormsModule,
        AngularMaterialModule,
        SharedModule
    ],
    declarations: [
        LoginComponent
    ],
    providers: [
        LoginService
    ]
})

export class LoginModule {}
