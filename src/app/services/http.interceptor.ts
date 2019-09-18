import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpResponse, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {environment} from '../../environments/environment';

import { EventsService } from './events.service';
import { AlertMessage } from '../shared/models/alert-message.model';
import { AlertType } from '../shared/models/alert-type.model';
import { GlobalSharedService } from './global-shared.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

    constructor(
        private eventsService: EventsService,
        private globalService: GlobalSharedService
    ) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = this.globalService.employee && this.globalService.employee.token;
        const newReq = req.clone({
            url: `${process.env.serverUrl}${req.url}`,
            setHeaders: {
                'Authorization': `Bearer ${token}`
            }
        });
        return next
            .handle(newReq)
            .pipe(
                tap(event => {
                    if (event instanceof HttpResponse) {
                        if (req.method !== 'GET') {
                            this.eventsService.alert(new AlertMessage(AlertType.success, ''));
                        }
                    }
                }, error => {
                    if (error.status === 401) {
                        console.log("Unauthorized");
                    }
                    this.eventsService.alert(new AlertMessage(AlertType.error, error.message));
                })
            );
    }
}
