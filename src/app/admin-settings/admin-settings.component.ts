import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import {filter} from 'rxjs/operators';

import {AdminRoute} from './admin-route.enum';
import { GlobalSharedService } from '../services/globalShared.service';
import { AdminSettingsService } from '../services/admin-settings.service';
import { AdminSettings } from '../interface/AdminSettings';

declare var $: any;
@Component({
	selector: 'admin-settings',
	templateUrl: 'admin-settings.component.html',
	styleUrls: ['admin-settings.component.css']
})

export class AdminSettingsComponent implements OnInit {

	leftNavItems: {url: AdminRoute|string, label: string}[] = [
		{url: AdminRoute.ORGANIZATION, label: 'Edit Organization'},
		{url: '',label:''},
		{url: AdminRoute.DIVISION, label: 'Division'},
		{url: AdminRoute.APPLICATION_GROUP, label: 'Application Group'},
		{url: AdminRoute.APPLICATION, label: 'Applicaton'},
		{url: AdminRoute.SPRINT, label: 'Sprint'},
		{url: '', label: ''},
		{url: AdminRoute.REQUIREMENT_TYPE, label: 'Type'},
		{url: AdminRoute.ATTRIBUTE, label: 'Attribuute'},
		{url: AdminRoute.RELEASE, label: 'Program'},
		{url: AdminRoute.STATUS, label: 'Sprint Status'},
		{url: AdminRoute.PHASE, label: 'Phase'},
		{url: '', label: ''},
		{url: AdminRoute.EMPLOYEE, label: 'Employee'},
		{url: '', label: ''},
		{url: AdminRoute.ROLE, label: 'Roles'},
		{url: AdminRoute.VENDOR, label: 'Vendor'},
		{url: AdminRoute.DESIGNATION, label: 'Designation'}
	]
	breadcrumb: string|null = "";
	action = 2; // create=0,save=1,List=2
	childComp: AdminSettings;

	constructor(
		private globalService: GlobalSharedService,
		private adminService: AdminSettingsService,
		private activatedRoute: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit() {
		this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => {      
	      let children = this.activatedRoute.children;
	      for (let child of children) {
	      	this.breadcrumb = child.snapshot.data ? child.snapshot.data['title'] : null;
	      }
	    });

	    this.globalService.adminSettingsActionEmitter.subscribe( (action:number) => {
	    	this.action = action;
	    	if (this.action === 0) {
				this.newRow(this.childComp);
			}
	    	if (this.action === 2) {
				this.updateList(this.childComp);
			}
	    });

		if (!this.globalService.roles) {
			this.adminService.getAllRoles({orgId:this.globalService.getRequest().orgId}).subscribe(result => this.globalService.roles = result);
		}
		if (!this.globalService.employees) {
			this.adminService.getEmployees({orgId:this.globalService.getRequest().orgId}).subscribe(result => this.globalService.employees = result);
		}
	}

	newRow(comp: AdminSettings) {
		comp.newRow();
	}

	onSave(comp: AdminSettings) {
		comp.selectedRow.orgId = this.globalService.getRequest().orgId;
		comp.selectedRow.modifiedByID = this.globalService.user.id;
		comp.save();
	}

	updateList(comp: AdminSettings) {
		comp.updateList();
	}

	onRouterActivate(evt: any) {
		this.childComp = <AdminSettings>evt;
	}
}
