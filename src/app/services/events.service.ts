import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { AlertMessage } from '../shared/models/alert-message.model';

@Injectable()
export class EventsService {

    constructor() {}

    private alertMessage$ = new Subject<AlertMessage>();

    get alertMessages(): Observable<AlertMessage> {
        return this.alertMessage$.asObservable();
    }

    alert(message: AlertMessage): void {
        this.alertMessage$.next(message);
    }
}
