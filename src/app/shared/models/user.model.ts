import { UserType } from './user-type.model';

export class User {
    id: string;
    firstName: string;
    lastName: string;
    type: UserType;
    email: string;
    imagePath: string;

    constructor(
        id: string,
        firstName: string,
        lastName: string,
        type: UserType,
        email: string,
        imagePath: string
    ) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.type = type;
        this.email = email;
        this.imagePath = imagePath;
    }
}
