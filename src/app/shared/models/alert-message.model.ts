import { AlertType } from './alert-type.model';

export class AlertMessage {
    type: AlertType;
    message: string;

    constructor(type: AlertType, message: string) {
        this.type = type;
        this.message = message;
    }
}
