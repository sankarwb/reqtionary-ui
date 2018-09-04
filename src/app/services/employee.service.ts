import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { userById } from '../endpoints';
import { Employee } from '../models/employee.model';

@Injectable()
export class EmployeeService {

    constructor(private http: HttpClient) {}

    getUserById(userId: number): Observable<Employee> {
        return this.http.get<Employee>(`${userById}${userId}`);
    }

}
