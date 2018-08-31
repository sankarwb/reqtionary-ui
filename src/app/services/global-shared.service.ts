import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';

@Injectable()
export class GlobalSharedService {

    constructor() {}

    private user$: Employee;

    set user(user: Employee) {
        this.user$ = user;
    }

    get user(): Employee {
        return this.user$;
    }
}
