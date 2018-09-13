import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { LoginRequest } from '../models/login-request.model';
import { GlobalSharedService } from '../../services';
import { authenticate } from '../../endpoints';
import { Employee } from '../../models/employee.model';

@Injectable()
export class LoginService {

    constructor(
        private http: HttpClient,
        private router: Router,
        private globalService: GlobalSharedService
    ) {}

    validateCredentials(request: LoginRequest): Subscription {
        return this.http.post<Employee>(authenticate, request).subscribe(response => this.userDetails(response));
    }

    userDetails(employee: Employee): void {
        this.globalService.user = employee;
        this.router.navigate(['/home', employee.id]);
    }
}
