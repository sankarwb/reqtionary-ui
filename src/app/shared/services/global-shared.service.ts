import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { UserType } from '../models/user-type.model';

@Injectable()
export class GlobalSharedService {

    constructor() {}

    private user$: User = new User('', 'Sankara', 'Asapu', UserType.developer, '', '');

    set user(user: User) {
        this.user$ = user;
    }

    get user(): User {
        return this.user$;
    }
}
