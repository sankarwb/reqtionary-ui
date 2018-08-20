import { UserType } from './user-type.model';

export class User {
    id: string;
    type: UserType;
    email: string;
    imagePath: string;

    constructor(
        id: string,
        type: UserType,
        email: string,
        imagePath: string
    ) {
        this.id = id;
        this.type = type;
        this.email = email;
        this.imagePath = imagePath;
    }
}
