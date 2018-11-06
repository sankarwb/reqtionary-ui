import { UserType } from '../shared/models/user-type.model';

export class Employee {
    id: number;
    uid: string;
    type: UserType;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    token: string;
    expires: string;
}
