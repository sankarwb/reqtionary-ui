import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpResponse, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { EventsService } from './events.service';
import { AlertMessage } from '../shared/models/alert-message.model';
import { AlertType } from '../shared/models/alert-type.model';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

    constructor(private eventsService: EventsService) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const newReq = req.clone({
            url: `http://localhost:3000/${req.url}`,
            setHeaders: {
                'Content-Type': 'application/json'
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
                    this.eventsService.alert(new AlertMessage(AlertType.error, error.message));
                })
            );
    }
}
