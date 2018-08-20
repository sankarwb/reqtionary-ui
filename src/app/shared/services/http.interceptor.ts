import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { EventsService } from './events.service';
import { AlertMessage } from '../models/alert-message.model';
import { AlertType } from '../models/alert-type.model';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

	constructor(private eventsService: EventsService) {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const newReq = request.clone({
			url: `http://localhost:8090/${request.url}?timestamp=${new Date().getTime()}`,
			setHeaders: {
				'Content-Type': 'application/json'
			}
		});

		return next.handle(newReq)
			.pipe(
				tap(event => {
					if (event instanceof HttpResponse) {
						if (request.method !== 'GET') {
							this.eventsService.alert(new AlertMessage(AlertType.success, event.statusText));
						}
					}
				}, (error: HttpErrorResponse) => {
					this.eventsService.alert(new AlertMessage(AlertType.error, error.message));
				})
			)
	}
}

