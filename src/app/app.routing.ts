import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AppRoute} from './app-route.enum';

const routes: Routes = [
    { path: `${AppRoute.LOGIN}`, loadChildren: './login/login.module#LoginModule' },
    { path: `${AppRoute.HOME}`, loadChildren: './reqtionary/reqtionary.module#ReqtionaryModule' },
    {path: `${AppRoute.ADMIN_SETTINGS}`, loadChildren: './admin-settings/admin-settings.module#AdminSettingsModule'},
    { path: '**', pathMatch: 'full', redirectTo: 'login' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ]
})

export class AppRoutingModule {}
