import {Injectable} from '@angular/core';
import {Employee} from '../models/employee.model';

@Injectable()
export class GlobalSharedService {

    currentApplicationId: number;
    currentBacklogProjectId: number;
    currentDefectsProjectId: number;
    currentPermDocProjectId: number;
    private employee$: Employee;
    
    constructor() {
        if (document.cookie) {
            let employee = new Employee();
            let parsedCookie = document.cookie.split(';').forEach(cookiePart => {
                let parts = cookiePart.split('=');
                switch (parts[0]) {
                    case 'UID': 
                        employee.id = parseInt(parts[1]);
                        break;
                    case 'firstName': 
                        employee.firstName = parts[1];
                        break;
                    case 'lastName': 
                        employee.lastName = parts[1];
                        break;
                    case 'token': 
                        employee.token = parts[1];
                        break;
                }
            });
            this.employee = employee;
        }
    }

    set employee(employee: Employee) {
        this.employee$ = employee;
    }

    get employee(): Employee {
        return this.employee$;
    }
}
