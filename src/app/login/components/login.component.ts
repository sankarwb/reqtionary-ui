import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { LoginService } from '../services/login.service';
import { LoginRequest } from '../models/login-request.model';

@Component({
    selector: 'app-login',
    template: `
    <div class="login-root-container">
        <div class="login-form-container">
            <div style="display: flex; flex-direction: column; justify-content: center; height: 20%;">
                <strong style="color: var(--theme-color); font-size: 30px;"> WINDBRICKS </strong>
            </div>
            <form class="login-form" #loginForm="ngForm">
                <div style="display: flex; flex-direction: column; justify-content: center; height: 25%; margin-bottom: 30px;">
                    <span style="flex: 1; font-size: 20px;">USERNAME</span>
                    <input type="text" name="email" class="login-input" ngModel required>
                </div>
                <div style="display: flex; flex-direction: column; justify-content: center; height: 25%; ">
                    <span style="flex: 1; font-size: 20px;">PASSWORD</span>
                    <input type="password" name="password" class="login-input" ngModel required>
                </div>
                <div style="display: flex; flex-direction: row; align-items: center; height: 20%;">
                    <a style="flex: 1; color: var(--theme-color);">Forgot Password?</a>
                    <a style="color: var(--theme-color);">Remember Me?</a>
                    <input type="checkbox" name="rememberMe" checked>
                </div>
                <div class="login-btn" (click)="login(loginForm)">
                    <label>LOGIN</label>
                </div>
                <div class="create-new-btn">
                    <a style="color: var(--theme-color);">Create an Account</a>
                </div>
            </form>
        </div>
    </div>
    `,
    styles: [
        `
        .login-root-container {
            display: flex; flex-direction: row; align-items: center; justify-content: center; height: 100%;
        }`, `
        .login-form-container {
            display: flex; flex-direction: column; align-items: center; width: 40%; height: 55%; box-shadow: 0 0 16px rgba(0, 0, 0, 0.10);
        }
        `, `
        .login-form {
            display: flex; flex-direction: column; width: 72%; height: 72%;
        }
        `, `
        .login-input {
            flex: 2; font-size: 16px; border: 1px solid #ccc; border-radius: 5px;
        }
        `, `
        .login-btn {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 10%;
            border-radius: 5px;
            cursor: pointer;
            background-image: linear-gradient(to bottom, var(--theme-color), white);
        }`, `
        .login-btn:hover {
            background-image: linear-gradient(to bottom right, var(--theme-color), white);
        }`, `
        .create-new-btn {
            display: flex; flex-direction: row; justify-content: center; align-items: flex-end; height: 10%; cursor: pointer;
        }
        `
    ]
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
