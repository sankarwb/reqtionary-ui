import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GlobalSharedService } from '../../services/globalShared.service';
import { AdminSettingsService } from '../../services/admin-settings.service';

import { EditableTableComponent } from '../../components/editable-table.component';
import { AdminSettings } from '../../interface/AdminSettings';
import { RoleEmployee } from '../../vo/RoleEmployee';

export class Project {	
	constructor(
		public id: number=0,
		public appId: number=0,
		public releaseId: number=0,
		public statusId: number=0,
		public phaseId: number=0,
		public name: string='',
		public desc: string='',
		public active: number=1,
		public code: string='',
		public type: number=0,
		public startDate: Date=new Date,
		public endDate: Date=new Date,
		public prodDate: Date=new Date,
		public modifiedByID: number=0,
		public roles: RoleEmployee[]=[new RoleEmployee()]
	) {}
}

@Component({
	selector: 'manage-application',
	templateUrl: 'manage-project.component.html'
})

export class ManageProjectComponent implements OnInit, AdminSettings {
	@ViewChild('form', {static: true}) form: FormGroup;
	@ViewChild(EditableTableComponent, {static: true}) roleEmpTable: EditableTableComponent;
	projects:any[];
	selectedIndex:number = 0;
	label:string = "Add New";
	columns:any[] = [
		{key:'releaseName',value:'Release',display:true,width:20},
		{key:'appName',value:'Application',display:true,width:20},
		{key:'name',value:'Sprint',dataType:'link',display:true,width:15},
		{key:'color',value:'Sprint Status',dataType:'color',displayTextKey:'status',display:true,width:5}
	];

	constructor(private globalService:GlobalSharedService,private adminService: AdminSettingsService) {}

	ngOnInit() {
		if( ! this.projects ) this.updateList();
		if( ! this.globalService.applications )
			this.adminService.getApplications({orgId:this.globalService.getRequest().orgId}).subscribe(result => this.globalService.applications = result);
		if( ! this.globalService.releases )
			this.adminService.getReleases({orgId:this.globalService.getRequest().orgId}).subscribe((result:any[]) => this.globalService.releases = result);
		if( ! this.globalService.phases )
			this.adminService.getPhases({orgId:this.globalService.getRequest().orgId}).subscribe((result:any[]) => this.globalService.phases = result);
		if( ! this.globalService.status )
			this.adminService.getStatus({orgId:this.globalService.getRequest().orgId}).subscribe((result:any[]) => this.globalService.status = result);
	}

	onTabChange(evt:any) {
		this.selectedIndex = evt.index;
		if( this.selectedIndex === 0) {
			this.label = "Add New";
			this.newRow();
		} else if(this.selectedIndex === 1) {
			if( this.label.indexOf('Edit') !== -1 && !(this.selectedRow.roles[this.selectedRow.roles.length-1] instanceof RoleEmployee) ) {
				let newRole:RoleEmployee = new RoleEmployee();
				newRole.modifiedByID = this.globalService.user.id;
				this.selectedRow.roles.push(newRole);
			}
			if(this.label.indexOf('Add') === 0)
				this.globalService.adminSettingsActionEmitter.emit(0);
			else
				this.globalService.adminSettingsActionEmitter.emit(1);
		}
	}

	selectedRow:any;
	newRow() {		
		this.selectedRow = new Project();
		this.selectedRow.roles.forEach( (row:RoleEmployee) => row.orgId = this.globalService.getRequest().orgId );
	}

	save() {
		if(!this.form.valid || this.selectedRow.divId === 0) {
			Object.keys(this.form.controls).forEach((field:string) => {
				const control = this.form.controls[field];
				control.markAsTouched({onlySelf: true});
			});
			this.globalService.notification.emit(this.globalService.formValidationMsg);
			return;
		}
		this.selectedRow.roles = this.roleEmpTable.getUpdatedRoles();
		this.selectedRow.orgId = this.globalService.getRequest().orgId;
		this.selectedRow.modifiedByID = this.globalService.user.id;
		this.adminService.updateProject(this.selectedRow).subscribe((resp:any) => {
			this.globalService.notification.emit(resp.success);
			this.globalService.adminSettingsActionEmitter.emit(2);
		}, err => this.globalService.notification.emit(err.success));
	}

	updateList() {
		this.selectedIndex = 0;
		this.adminService.getProjects({orgId:this.globalService.getRequest().orgId}).subscribe((result:any[]) => this.projects = result);
	}
	
	onItemSelected(row:any) {
		this.selectedRow = row;
		this.label = `Edit ${row.name}`;
		this.selectedIndex = 1;
		this.globalService.adminSettingsActionEmitter.emit(1);
	}
}
