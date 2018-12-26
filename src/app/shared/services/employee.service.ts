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
    
    employees: Employee[];

    constructor(private http: HttpClient) {}

    getEmployeeById(employeeId: number, byService: boolean=true): Observable<Employee> {
        if (byService) {
            return this.http.get<Employee>(`${employeeById.replace(':employeeId', employeeId.toString())}`);
        } else {
            return new Observable(observer => {
                let filtered = [...this.employees].filter(employee => employee.id===employeeId);
                observer.next(filtered.length ? filtered[0] : new Employee());
                observer.complete();
            });
        }
    }

    getEmployeesByApplication(applicationId: number): Observable<Employee[]> {
        return this.http.get<Employee[]>(`${employeesByApplication.replace(':applicationId', applicationId.toString())}`);
    }

}
