import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {
    employeeById,
    employeesByApplication
} from '../../endpoints';
import {Employee} from '../../models/employee.model';

@Injectable()
export class EmployeeService {

    constructor(private http: HttpClient) {}

    getEmployeeById(employeeId: number): Observable<Employee> {
        return this.http.get<Employee>(`${employeeById.replace(':employeeId', employeeId.toString())}`);
    }

    getEmployeesByApplication(applicationId: number): Observable<Employee[]> {
        return this.http.get<Employee[]>(`${employeesByApplication.replace(':applicationId', applicationId.toString())}`);
    }

}
