import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { UserType } from '../models/user-type.model';

@Injectable()
export class GlobalSharedService {

    constructor() {}

    private user$: User = new User('', UserType.developer, '', '');

    set user(user: User) {
        this.user$ = user || new User('', UserType.developer, '', '');
    }

    get user(): User {
        return this.user$;
    }
}
