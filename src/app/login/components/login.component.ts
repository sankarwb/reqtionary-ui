import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { LoginService } from '../services/login.service';
import { LoginRequest } from '../models/login-request.model';

@Component({
    selector: 'app-login',
    template: `
    <div style="display: flex; flex-direction: row; align-items: center; justify-content: center; height: 100%;">
        <form style="display: flex; flex-direction: column;" #loginForm="ngForm">
            <mat-form-field>
            <input matInput name="email" placeholder="Email" ngModel required>
            </mat-form-field>
            <mat-form-field>
            <input matInput name="password" type="password" placeholder="Password" ngModel required>
            </mat-form-field>
            <button mat-raised-button (click)="login(loginForm)">Login</button>
        </form>
    </div>
    `
})

export class LoginComponent implements OnDestroy {

    constructor(private loginService: LoginService) {}

    private subscription: Subscription;

    login(form: NgForm) {
        this.subscription = this.loginService.validateCredentials(new LoginRequest(form.value.email, form.value.password));
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
