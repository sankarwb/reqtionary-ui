import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { AlertMessage } from '../models/alert-message.model';

@Injectable()
export class EventsService {

    constructor() {}

    private alertMessage$ = new Subject<AlertMessage>();
    private appSelection$ = new Subject<string>();

    get alertMessages(): Observable<AlertMessage> {
        return this.alertMessage$.asObservable();
    }

    alert(message: AlertMessage): void {
        this.alertMessage$.next(message);
    }

    get appSelectionChange(): Observable<string> {
        return this.appSelection$.asObservable();
    }

    appSelected(appName: string): void {
        this.appSelection$.next(appName);
    }
}
