import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'app' },
    { path: 'login', loadChildren: './login/login.module#LoginModule' },
    { path: 'home', loadChildren: './reqtionary/reqtionary.module#ReqtionaryModule' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ]
})

export class AppRoutingModule {}
