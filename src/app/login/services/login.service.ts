import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

import { LoginRequest } from '../models/login-request.model';
import { GlobalSharedService } from '../../services';
import { authenticate } from '../../endpoints';
import { Employee } from '../../models/employee.model';

@Injectable()
export class LoginService implements OnDestroy {

    private subscription: Subscription;

    constructor(
        private http: HttpClient,
        private router: Router,
        private globalService: GlobalSharedService
    ) {}

    validateCredentials(request: LoginRequest): void {
        // TODO: encrypt password
        this.subscription = this.http.post<Employee>(authenticate, request).subscribe(response => this.setCookie(response));
    }

    setCookie(employee: Employee): void {
        const expires = moment().add(30, 'second');
        document.cookie = `UID=${employee.id};firstName=${employee.firstName};lastName=${employee.lastName};token=${employee.token};expires=${JSON.stringify(expires.valueOf())}`;
        this.globalService.employee = employee;
        this.router.navigate(['/home', employee.id]);
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
