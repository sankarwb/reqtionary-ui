import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GlobalSharedService } from '../services/globalShared.service';

@Injectable()
export class AdminSettingsService {
	constructor(
		private globalService: GlobalSharedService,
		private httpClient: HttpClient
	) {}

	verifyLogin(req: any): Observable<any[]> {
		return this.httpClient.post<any>('/admin-settings/verifyLogin', req);
	}

	getOrgDetails(req: any): Observable<any[]> {
		return this.httpClient.post<any>('/admin-settings/getOrgDetails', req);
	}
	getDivisions(req: any): Observable<any[]> {
		return this.httpClient.post<any>('/admin-settings/getDivisions', req);
	}
	getAppGroups(req: any):Observable<any[]>{
		return this.httpClient.post<any>('/admin-settings/getAppGroups', req);
	}
	getApplications(req: any):Observable<any[]>{
		return this.httpClient.post<any>('/admin-settings/getApplications', req);
	}
	getProjects(req: any):Observable<any[]>{
		return this.httpClient.post<any>('/admin-settings/getAllProjects', req);
	}
	getEmployees(req: any): Observable<any[]> {
		// return this.httpClient.post<any>('/admin-settings/getEmployees', req);
		return this.httpClient.post<any>('/admin-settings/getEmployees', req);
	}
	getDesignations(req: any): Observable<any[]> {
		return this.httpClient.post<any>('/admin-settings/getDesignations', req);
	}
	getAppProject(req: any): Observable<any[]> {
		return this.httpClient.post<any>('/admin-settings/getAppProject', req);
	}
	getVendors(req: any): Observable<any[]> {
		return this.httpClient.post<any>('/admin-settings/getVendors', req);
	}
	getRequirementTypes(req: any): Observable<any[]> {
		return this.httpClient.post<any>('/admin-settings/getRequirementTypes', req);
	}
	getAttributes(req: any): Observable<any[]> {
		return this.httpClient.post<any>('/admin-settings/getAllAttributes', req);
	}
	getAllRoles(req: any): Observable<any[]> {
		// return this.httpClient.post<any>('/admin-settings/getAllRoles', req);
		return this.httpClient.post<any>('/admin-settings/getAllRoles', req);
	}
	getReleases(req: any): Observable<any[]> {
		return this.httpClient.post<any>('/admin-settings/getReleases', req);
	}
	getPhases(req: any): Observable<any[]> {
		return this.httpClient.post<any>('/admin-settings/getPhases', req);
	}
	getStatus(req: any): Observable<any[]> {
		return this.httpClient.post<any>('/admin-settings/getStatus', req);
	}
	getTimezones(req: any): Observable<any[]> {
		return this.httpClient.post<any>('/admin-settings/getTimezones', req);
	}


	// Create / Update services
	//Organization
	updateOrg(req: any): Observable<any[]> {
		return this.httpClient.post<any>('/admin-settings/updateOrgDetails', req);
	}
	//Release
	updateRelease(req: any): Observable<any[]> {
		return this.httpClient.post<any>('/admin-settings/updateRelease', req);
	}
	//Division
	updateDivision(req: any): Observable<any[]> {
		return this.httpClient.post<any>('/admin-settings/updateDivision', req);
	}
	//Application Group
	updateAppGroup(req: any): Observable<any[]> {
		return this.httpClient.post<any>('/admin-settings/updateAppGroup', req);	
	}
	//Application
	updateApp(req: any): Observable<any[]> {
		return this.httpClient.post<any>('/admin-settings/updateApp', req);	
	}
	//Project
	updateProject(req: any): Observable<any[]> {
		return this.httpClient.post<any>('/admin-settings/updateProject', req);	
	}
	//Status
	updateStatus(req: any): Observable<any[]> {
		return this.httpClient.post<any>('/admin-settings/updateStatus', req);	
	}
	//Vendor
	updateVendor(req: any): Observable<any[]> {
		return this.httpClient.post<any>('/admin-settings/updateVendor', req);	
	}
	//Phase
	updatePhase(req: any): Observable<any[]> {
		return this.httpClient.post<any>('/admin-settings/updatePhase', req);	
	}
	//Role
	updateRole(req: any): Observable<any[]> {
		return this.httpClient.post<any>('/admin-settings/updateRole', req);
	}
	//Designation
	updateDesignation(req: any): Observable<any[]> {
		return this.httpClient.post<any>('/admin-settings/updateDesignation', req);
	}
	//Employee
	updateEmployee(req: any): Observable<any[]> {
		return this.httpClient.post<any>('/admin-settings/updateEmployee', req);
	}
}