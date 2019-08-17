import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { GlobalSharedService } from '../services/globalShared.service';

@Injectable()
export class AttributeService {
	constructor(private globalService: GlobalSharedService) { }

	updateAttribute(req:any): Observable<any[]> {
		return this.globalService.processHttpRequest(req,'updateAttribute');
	}	

	getAttributeValues(req:any): Observable<any[]> {
		return this.globalService.processHttpRequest(req,'getAttributeValues');
	}
}