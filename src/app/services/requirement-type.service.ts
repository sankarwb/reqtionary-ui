import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { GlobalSharedService } from '../services/globalShared.service';

@Injectable()
export class RequirementTypeService {
	constructor(private globalService: GlobalSharedService) { }

	updateRequirementType(req:any): Observable<any[]> {
		return this.globalService.processHttpRequest(req,'updateRequirementType');
	}

	getObjectDetails(req:any): Observable<any[]> {
		return this.globalService.processHttpRequest(req,'getObjectDetails');
	}

	getAppObjectAttributes(req:any): Observable<any[]> {
		return this.globalService.processHttpRequest(req,'getAppObjectAttributes');
	}

	getObjectArtifactAttributes(req: any): Observable<any[]> {
		return this.globalService.processHttpRequest(req, 'getObjectArtifactAttributes');
	}
}