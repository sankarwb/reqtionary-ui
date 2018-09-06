import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription, Observable } from 'rxjs';

import { GlobalSharedService, EmployeeService } from '../../services';
import { Application } from '../../models/application.model';
import { applicationsByUser, projectsByapplication } from '../../endpoints';
import { Release } from '../../models/release.model';

@Injectable()
export class HomeService {

    constructor(
        private http: HttpClient,
        private globalService: GlobalSharedService,
        private employeeService: EmployeeService
    ) {}

    subscriptions: Subscription[] = [];

    getUser(userId: number) {
        if (!this.globalService.user) {
            const subscription = this.employeeService.getUserById(userId).subscribe(user => this.globalService.user = user);
            this.subscriptions.push(subscription);
        }
    }
    getApplicationsByUser(userId: number): Observable<Application[]> {
        return this.http.get<Application[]>(`${applicationsByUser}${userId}`);
    }

    getProjectsByApplication(userId: number, applicationId: number): Observable<Release[]> {
        return this.http.get<Release[]>(`${projectsByapplication}${userId}/${applicationId}`);
    }

    unsubscribe() {
        while (this.subscriptions.length !== 0) {
            this.subscriptions.pop().unsubscribe();
        }
    }
}
