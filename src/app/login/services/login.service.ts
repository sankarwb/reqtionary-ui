import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { LoginRequest } from '../models/login-request.model';
import { LoginResponse } from '../models/login-response.model';
import { GlobalSharedService } from '../../shared/services';
import { User } from '../../shared/models/user.model';
import { UserType } from '../../shared/models/user-type.model';

@Injectable()
export class LoginService {

    constructor(
        private http: HttpClient,
        private router: Router,
        private globalService: GlobalSharedService
    ) {}

    validateCredentials(request: LoginRequest): Subscription {
        return this.http.get('', {withCredentials: true})
                .subscribe((response: LoginResponse) => {
                    this.userDetails(response);
                    this.router.navigateByUrl('/app/home');
                });
    }

    userDetails(response: LoginResponse): void {
        const user = new User('U123', UserType.developer, '', '');
        this.globalService.user = user;
    }
}
