import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {
    Subscription,
    Observable
} from 'rxjs';
import {Application} from '../../models/application.model';
import {applicationsByEmployee} from '../../endpoints';

@Injectable()
export class HomeService {
    
    subscriptions: Subscription[] = [];

    constructor(private http: HttpClient) {}

    getApplicationsByEmployee(employeeId: number): Observable<Application[]> {
        return this.http.get<Application[]>(`${applicationsByEmployee.replace(':employeeId', employeeId.toString())}`);
    }

    unsubscribe() {
        while (this.subscriptions.length !== 0) {
            this.subscriptions.pop().unsubscribe();
        }
    }
}
