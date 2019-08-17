import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
//import { Subject } from 'rxjs/Subject';

@Injectable()
export class GlobalSharedService {
	adminSettingsActionEmitter = new EventEmitter<number>();// Admin setting actions(Create=0, Save=1, List=2) emitter.
	errorEmitter = new EventEmitter<any>();// to be removed. event emitter to notify errors at app level
	modalDialog = new EventEmitter<any>();// global dialog box event emitter to open an app level dialog
	notification = new EventEmitter<string>();// notification event emitter to display app notifications
	artifactsList = new EventEmitter<any>();// event emitter to notify to get artifacts list

	constructor(private httpClient: HttpClient) {}
	currentAppId: number;
	breadcrumb:any[] = [];
	//Admin screens data objects
	releases:any[];
	phases:any[];
	status:any[];
	vendors:any[];
	designations:any[];
	roles:any[];
	employees:any[];
	divisions:any[];
	appGroups:any[];
	applications:any[];
	requirementTypes:any[];
	attributes:any[];
	agileStatusValues:any[];
	formValidationMsg:string = "Please clear form errors";
	userTypes:any[] = [{id:0,name:'Admin User'},{id:1,name:'Project Admin User'},{id:2,name:'Standard User'}];
	roleColumns:any[] = [{key:'roleName',value:'Role Name',width:'40'},{key:'empName',value:'Employee Name',width:'40'}];

	constants = {
		SERVER_LOCAL_PATH: 'http://localhost:8090/api/',
		SERVER_PATH: 'http://107.170.228.97:8090/api/',
		projectType: {
			defect: {id: 0, name: 'defects', type: -1},
			backlog: {id: 0, name: 'backlog', type: -2},
			permdoc: {id: 0, name: 'permanentdocumentation', type: -3}
		}
	};
	request = { orgId: 4, appId:16, employeeId: 31, projectId:0, projectType:0, objectType:0 };
	//user:any = {"orgId":4,"id":33,"UID":"2152312","type":0,"fName":"Shankar","mName":"Swaroop","lName":"Kumar","emailID":"asapu@insurance.com","photopath":"6493920_filecabinet.png","timezone":3,"active":1,"password":""};
	user:any = {"orgId":4,"id":31,"UID":"55","type":0,"fName":"Vamsi","mName":"Addanki","lName":"Addanki","emailID":"vamsi@insurance.com","photopath":"6967004_Insurance_Logo.jpg","timezone":9,"active":1,"password":""};
	/*_user:any;
	set user(data:any) {
		this._user = data;
		if( ! data ) return;
		this.request.orgId = data.orgId;
		this.request.employeeId = data.id;
	}
	get user(): any {
		return this._user;
	}*/
	getProjectId(projectType:string|number):number {
		if((typeof projectType === 'string' && projectType === this.constants.projectType.defect.name)
			|| (typeof projectType === 'number' && projectType === this.constants.projectType.defect.type))
			return this.constants.projectType.defect.id;
		else if((typeof projectType === 'string' && projectType === this.constants.projectType.backlog.name)
			|| (typeof projectType === 'number' && projectType === this.constants.projectType.backlog.type))
			return this.constants.projectType.backlog.id;
		else if((typeof projectType === 'string' && projectType === this.constants.projectType.permdoc.name)
			|| (typeof projectType === 'number' && projectType === this.constants.projectType.permdoc.type))
			return this.constants.projectType.permdoc.id;
	}
	defectObjectId:number = 53;
	defectObjectUID:string = "DE";

	registerError(error:any){
		this.errorEmitter.emit(error);
	}
	getServerURL() {
		return (window.location.href.indexOf("localhost") === -1)?this.constants.SERVER_PATH:this.constants.SERVER_LOCAL_PATH;
	}
	getRequest() {
		return this.request;
	}

	getProjectTypeFromURL(url:string):string {
		if(url.indexOf(this.constants.projectType.defect.name) !== -1){
			return this.constants.projectType.defect.name;
		} else if(url.indexOf(this.constants.projectType.backlog.name) !== -1){
			return this.constants.projectType.backlog.name;
		} else if(url.indexOf(this.constants.projectType.permdoc.name) !== -1){
			return this.constants.projectType.permdoc.name;
		}
	}

	getProjectTypeSignature(projectType:string):number {
		if(projectType.indexOf(this.constants.projectType.defect.name) !== -1){
			return this.constants.projectType.defect.type;
		} else if(projectType.indexOf(this.constants.projectType.backlog.name) !== -1){
			return this.constants.projectType.backlog.type;
		} else if(projectType.indexOf(this.constants.projectType.permdoc.name) !== -1){
			return this.constants.projectType.permdoc.type;
		}
	}

	/****************** Common http service process for application ******************/
	processHttpRequest(req:any, uri: string): Observable<any> {
		let reqJson = JSON.stringify(req);
		return this.httpClient.post(uri, req);
			//.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
	}
}